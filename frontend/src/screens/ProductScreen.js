import React, { useEffect, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import "../screens/Styles/Product/product.css";

export default function ProductScreen(props) {
    //Kullanılan fonksiyonların tanımlandığı kod satırları
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const {loading,error,product} = productDetails;
    const userSignin = useSelector((state) => state.userSignin); //Rate and Review Products
    const { userInfo } = userSignin; //Rate and Review Products

    const productReviewCreate = useSelector((state) => state.productReviewCreate); //Rate and Review Products
    const {loading:loadingReviewCreate,error:errorReviewCreate,success:successReviewCreate} = productReviewCreate; //Rate and Review Products

    const [rating, setRating] = useState(0); //Rate and Review Products
    const [comment, setComment] = useState(''); //Rate and Review Products
    
    useEffect(() => {
        if(successReviewCreate){ //Rate and Review Products
            window.alert('Review Submitted Successfully'); //Rate and Review Products
            setRating(''); //Rate and Review Products
            setComment(''); //Rate and Review Products
            dispatch({type: PRODUCT_REVIEW_CREATE_RESET}); //Rate and Review Products
        }
        dispatch(detailsProduct(productId));
    },[dispatch,productId,successReviewCreate]); //Rate and Review Products
    //},[dispatch,productId]);
    const addToCartHandler = () =>{
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };
    const submitHandler = (e) => { //Rate and Review Products
        e.preventDefault(); //Rate and Review Products
        if(comment && rating) { //Rate and Review Products
            dispatch(createReview(productId, {rating,comment,name: userInfo.name})); //Rate and Review Products
        } else {
            alert('Please enter comment and rating'); //Rate and Review Products
        }
    }
    return (
        <div>
            {loading? <LoadingBox/> //Yükleme ekranın loading komutunda gösterileceğinin belirlendiği yer.
            :
            error? (<MessageBox variant="danger">{error}</MessageBox>
            ):(
                //Başarısız ekranın error komutunda gösterileceğinin belirlendiği yer.
        <div className="product">
            <div className="back">
                <Link to="/">Back to result</Link>
            </div>
            <div className="contentStage">
                <div className="left">
                    <div className="split">
                        <div className="imageStage">
                            <img src={product.image} alt={product.name}/>
                            {/*ürünün resminin çekildiği satır.*/}
                        </div>
                        <div className="productDescStage">
                            <div className="productCard">
                                <ul> {/*Product sayfasında seller bilgilerinin bulunduğu kısım*/}
                                    <li>
                                        <h1>{product.name}</h1> {/*ürünün adının çekildiği satır.*/}
                                    </li>
                                    <li>
                                    <Rating value={product.rating} text={product.numReviews + ' reviews'} />
                                        {/*ürünün ratinginin ve review kısmının çekildiği satır.*/}
                                    </li>
                                    <li>
                                        <strong>Price : </strong>${product.price} {/*ürünün fiyatının çekildiği satır.*/}
                                    </li>
                                    <li><strong>Description:</strong>
                                        <p>{product.description}</p> {/*ürünün açıklamasının çekildiği satır.*/}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="commentStage">
                        {userInfo ? (
                        <form className="form" onSubmit={submitHandler}>
                            <div>
                                <h2>Write a customer review</h2>
                            </div>
                            <div>
                                <label htmlFor="rating"><strong>Rating</strong></label>
                                <select className="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                                    <option value="">Select...</option>
                                    <option value="1">1- Poor</option>
                                    <option value="2">2- Fair</option>
                                    <option value="3">3- Good</option>
                                    <option value="4">4- Very good</option>
                                    <option value="5">5- Excelent</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="comment"><strong>Comment</strong></label>
                                <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                            </div>
                            <div>
                                <label />
                                <button className="primary" type="submit">Submit</button>
                            </div>
                            <div>
                                {loadingReviewCreate && <LoadingBox/>}
                                {errorReviewCreate && (<MessageBox variant="danger">{errorReviewCreate}</MessageBox>)}
                            </div>
                        </form>
                        ) : (
                        <MessageBox>Please <Link to="/signin">Sign In</Link> to write a review</MessageBox>
                        )}
                    </div>
                </div>
                <div className="right">
                    <div className="RightContentStage">
                        <div className="buyCard">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div><strong>Price</strong></div>
                                        <div className="price">${product.price}</div>
                                        {/*ürünün fiyatının çekildiği satır.*/}
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div><strong>Status</strong></div>
                                        <div>
                                            {product.coutInStock > 0?(<span className="success">In Stock</span>):
                                            (<span className="danger">Unavailable</span>)}
                                            {/*ürünün coutinstock kısmı 0 dan büyük değil ise unavailable olarak gösterildiği satır.*/}
                                        </div>
                                    </div>
                                </li>
                                {
                                    //ürününü coutinstock kısmı 0'dan büyük ise aşağıdaki kod satırını uygula
                                    product.coutInStock > 0 && (
                                    <>
                                    <li>
                                        <div className="row">
                                            <div><strong>Qty</strong></div>
                                            <div>
                                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                                    {/*coutinstock'da belirtildiği sayıya kadar 1 artırarak ulaş*/}
                                                    {
                                                        [...Array(product.coutInStock).keys()].map((x) => (
                                                            <option key={x+1} value={x+1} > {x+1}</option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                        {/*buttona basıldığı zaman addToCardHandler kısmına yönlendir.*/}
                                    </li>
                                    </>
                                )}
                            </ul>
                        </div>
                        <div className="reviewsStage">
                            <h2 id="reviews">Reviews</h2>
                                    {product.reviews.length === 0 && (
                                    <MessageBox>There is no review</MessageBox>
                            )}
                            <div className="scroll-bg">
                                <div className="scroll-div">
                                    <div className="scroll-object">
                                        <ul>
                                        {product.reviews.map((review) => (
                                            <div className="reviewsCard">
                                                <li key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating}></Rating>
                                                <p className="date">{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                                </li>
                                            </div>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
            )} 
        </div>
    )
}

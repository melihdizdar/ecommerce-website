import { PRODUCTS_DETAILS_FAIL, PRODUCTS_DETAILS_SUCCESS,PRODUCTS_DETAILS_REQUEST, PRODUCTS_LIST_FAIL, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCTS_CATEGORY_LIST_REQUEST, PRODUCTS_CATEGORY_LIST_SUCCESS, PRODUCTS_CATEGORY_LIST_FAIL, PRODUCT_REVIEW_CREATE_REQUEST, PRODUCT_REVIEW_CREATE_SUCCESS, PRODUCT_REVIEW_CREATE_FAIL } from "../constants/productConstants"
import axios from "axios";

/*Ürünler listelenirken talep,başarılı ve başarısız durumların try catch yöntemi ile gösterildiği kod satırı*/
//export const listProducts = () => async (dispatch) => {
//export const listProducts = ({ seller = '' }) => async (dispatch) => { //Implement Seller View
//export const listProducts = ({ seller = '' , name = ''}) => async (dispatch) => { //Create Search Box and Search Screen
//export const listProducts = ({ seller = '' , name = '', category = ''}) => async (dispatch) => { //Add Category Sidebar and Filter
//export const listProducts = ({ seller = '' , name = '', category = '',  order = '', min = 0, max = 0, rating = 0,}) => async (dispatch) => { //Sort and filter product
export const listProducts = ({ pageNumber = '',seller = '' , name = '', category = '',  order = '', min = 0, max = 0, rating = 0,}) => async (dispatch) => { //Implement Pagination
    dispatch({
        type: PRODUCTS_LIST_REQUEST,
    });
    try{
        //const {data} = await axios.get('/api/products');
        //const { data } = await axios.get(`/api/products?seller=${seller}`); //Implement Seller View
        //const { data } = await axios.get(`/api/products?seller=${seller}&name=${name}`); //Create Search Box and Search Screen
        //const { data } = await axios.get(`/api/products?seller=${seller}&name=${name}&category=${category}`); //Add Category Sidebar and Filter
        //const { data } = await axios.get(`/api/products?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`); //Sort and filter product
        const { data } = await axios.get(`/api/products?pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`); //Implement Pagination
        dispatch({type: PRODUCTS_LIST_SUCCESS,payload:data});
    } catch(error){
        dispatch({type:PRODUCTS_LIST_FAIL,payload: error.message});
    }
};
export const listProductCategories = () => async (dispatch) => { //Add Category Sidebar and Filter
  dispatch({ //Add Category Sidebar and Filter
    type: PRODUCTS_CATEGORY_LIST_REQUEST, //Add Category Sidebar and Filter
  }); //Add Category Sidebar and Filter
  try {
    const { data } = await axios.get(`/api/products/categories`); //Add Category Sidebar and Filter
    dispatch({ type: PRODUCTS_CATEGORY_LIST_SUCCESS, payload: data }); //Add Category Sidebar and Filter
  } catch (error) { //Add Category Sidebar and Filter
    dispatch({ type: PRODUCTS_CATEGORY_LIST_FAIL, payload: error.message }); //Add Category Sidebar and Filter
  }
};
/*Ürünlerin detay sayfasında talep,başarılı ve başarısız durumların try catch yöntemi ile gösterildiği kod satırı*/
export const detailsProduct = (productId) => async(dispatch) => {
    dispatch({type: PRODUCTS_DETAILS_REQUEST, payload:productId});
    try{
        const {data} = await axios.get(`/api/products/${productId}`);
        dispatch({type: PRODUCTS_DETAILS_SUCCESS,payload: data});
    } catch(error){
        dispatch({type:PRODUCTS_DETAILS_FAIL, payload:error.response && error.response.data.message ?
        error.response.data.message : error.message,});
    }
};

export const createProduct = () => async (dispatch,getState) => { //create product
    dispatch({type: PRODUCT_CREATE_REQUEST});
    const { userSignin: {userInfo} } = getState();
    try {
        const { data } = await axios.post('/api/products', {} , {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data.product, 
        });
    } catch(error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: PRODUCT_CREATE_FAIL, payload: message});
    }
}

export const updateProduct = (product) => async (dispatch, getState) => { //update product
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
    const {userSignin: { userInfo },} = getState();
    try {
      const { data } = await axios.put(`/api/products/${product._id}`, product, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
    }
  };

export const deleteProduct = (productId) => async (dispatch, getState) => {  //delete product
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload:data});
  } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
    }
  };

  export const createReview = (productId,review) => async (dispatch,getState) => { //Rate and Review Products
    dispatch({type: PRODUCT_REVIEW_CREATE_REQUEST}); //Rate and Review Products
    const { userSignin: {userInfo} } = getState(); //Rate and Review Products
    try {
        const { data } = await axios.post(`/api/products/${productId}/reviews`, review , { //Rate and Review Products
            headers: { Authorization: `Bearer ${userInfo.token}` }, //Rate and Review Products
        });
        dispatch({type: PRODUCT_REVIEW_CREATE_SUCCESS, payload: data.review,  //Rate and Review Products
        });
    } catch(error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message; //Rate and Review Products
        dispatch({type: PRODUCT_REVIEW_CREATE_FAIL, payload: message}); //Rate and Review Products
    }
}
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function EditProfileScreen() {
  const [name, setName] = useState(''); //update user profile
  const [email, setEmail] = useState(''); //update user profile
  const [password, setPassword] = useState(''); //update user profile
  const [confirmPassword, setConfirmPassword] = useState(''); //update user profile

  const [sellerName, setSellerName] = useState(''); //updateImplement Seller View
  const [sellerLogo, setSellerLogo] = useState(''); //updateImplement Seller View
  const [sellerDescription, setSellerDescription] = useState(''); //updateImplement Seller View

  const userSignin = useSelector((state) => state.userSignin); //display user profile
  const { userInfo } = userSignin; //display user profile
  const userDetails = useSelector((state) => state.userDetails); //display user profile
  const { loading, error, user } = userDetails; //display user profile
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile); //update user profile
  const { success: successUpdate, error: errorUpdate, loading: loadingUpdate, } = userUpdateProfile; //update user profile
  const dispatch = useDispatch(); //display user profile
  useEffect(() => { //display user profile
    if (!user) { //update user profile
      dispatch({ type: USER_UPDATE_PROFILE_RESET }); //update user profile
      dispatch(detailsUser(userInfo._id)); //update user profile
    } else { //update user profile
      setName(user.name); //update user profile
      setEmail(user.email); //update user profile
      if (user.seller) { //updateImplement Seller View
        setSellerName(user.seller.name); //updateImplement Seller View
        setSellerLogo(user.seller.logo); //updateImplement Seller View
        setSellerDescription(user.seller.description); //updateImplement Seller View
      }
    }
  }, [dispatch, userInfo._id, user]); //update user profile
  //  dispatch(detailsUser(userInfo._id)); //display user profile
  //}, [dispatch, userInfo._id]); //display user profile
  const submitHandler = (e) => { //display user profile
    e.preventDefault(); //display user profile
    if (password !== confirmPassword) { //update user profile
      alert('Password and Confirm Password Are Not Matched'); //update user profile
    } else { //update user profile
      //dispatch(updateUserProfile({ userId: user._id, name, email, password })); //update user profile
      dispatch(
        updateUserProfile({userId: user._id,name,email,password,sellerName,sellerLogo,sellerDescription,})); //updateImplement Seller View
    }
  };
  return (
    <>
      <section className="uk-section uk-background-primary">
        <div className="uk-container uk-text-center" uk-scrollspy="cls: uk-animation-fade; delay: 300; repeat:true;">
            <h1 className="uk-margin-remove">User Profile</h1>
        </div>
      </section>
      <section className="uk-section-large">
          <div className="uk-container">
            <form className="uk-grid-medium uk-width-1-2@m uk-flex-center uk-margin-auto" uk-grid="true" onSubmit={submitHandler}>
              {loading ? (<LoadingBox/>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : 
              (
                <>
                  {loadingUpdate && <LoadingBox/>}
                  {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                  {successUpdate && (<MessageBox variant="success">Profile Updated Successfully</MessageBox>)}
                  <div className="uk-width-1-1@m">
                    <label htmlFor="name">Name</label>
                    <input id="name" className="uk-input" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></input>
                  </div>
                  <div className="uk-width-1-1@m">
                    <label htmlFor="email">Email</label>
                    <input id="email" className="uk-input" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                  </div>
                  <div className="uk-width-1-1@m">
                    <label htmlFor="password">Password</label>
                    <input id="password" className="uk-input" type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></input>
                  </div>
                  <div className="uk-width-1-1@m">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" className="uk-input" type="password" placeholder="Enter confirm password" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                  </div>
                  <div className="uk-width-1-1@m uk-flex uk-flex-center">
                    <label />
                    <button className="uk-button uk-button-default" type="submit">Update</button>
                  </div>
                </>
              )}
            </form>
          </div>
        </section>
    </>
  );
}
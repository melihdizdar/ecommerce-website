import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cardActions';
import CheckoutSteps from '../components/CheckoutSteps'
import "../screens/Styles/Shipping/shipping.css";

export default function ShippingAddressScreen(props) {
    //logout olunduğunda shipping sayfasının gelmeyip signin sayfasının gelmesi için yazılan kodları
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    /*Shipping address'de girdiğin bilgilerin kaybolmaması için kullanılan kod*/
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;
    const [lat, setLat] = useState(shippingAddress.lat); //Choose address on google map
    const [lng, setLng] = useState(shippingAddress.lng); //Choose address on google map
    const userAddressMap = useSelector((state) => state.userAddressMap); //Choose address on google map
    const { address: addressMap } = userAddressMap; //Choose address on google map
    /**/
    if(!userInfo){
        props.history.push('/signin');
    } 
    /*-----*/
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        /*Shipping Screen button action*/
        e.preventDefault();
        const newLat = addressMap ? addressMap.lat : lat; //Choose address on google map
        const newLng = addressMap ? addressMap.lng : lng; //Choose address on google map
        if (addressMap) {
          setLat(addressMap.lat); //Choose address on google map
          setLng(addressMap.lng); //Choose address on google map
        }
        let moveOn = true; //Choose address on google map
        if (moveOn) { //Choose address on google map
          dispatch(saveShippingAddress({ fullName, address, city, postalCode, country, lat: newLat, lng: newLng,})); //Choose address on google map
          props.history.push('/payment'); //Choose address on google map
        }
    };
    return (
        <div className="shipping">
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" placeholder="Enter full name" value={fullName}
                    onChange={(e) => setFullName(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Enter address" value={address}
                    onChange={(e) => setAddress(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" placeholder="Enter city" value={city}
                    onChange={(e) => setCity(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" id="postalCode" placeholder="Enter postal code" value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" placeholder="Enter country" value={country}
                    onChange={(e) => setCountry(e.target.value)} required></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

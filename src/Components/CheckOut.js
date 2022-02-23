import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl, basemenuUrl,basePayUrl } from '../App'
import axios from 'axios';
import Button from '@mui/material/Button'

function CheckOut() {
  const navigate = useNavigate();
  const [loginValidation, setLoginValidation] = useState('')
  const [cartData, setCartData] = useState([]);
  const token = localStorage.getItem("validLogin")

  const getData = async () => {
    let response = await axios.get(`${basemenuUrl}/view-cart/${token}`);
    if (response.data.statusCode === 200) {
      setCartData(response.data.body)
    }
    else {
      console.log(response.data);

    }
  }

  const loginVerification = async () => {

    let response = await axios.get(`${basemenuUrl}/view-cart/${token}`);
    setCartData(response.data.body)
    console.log(cartData);
    let res = await axios.post(`${baseUrl}/verify-login/${token}`)
    if (res.data.statusCode === 200) {
      console.log(res.data)
      setLoginValidation('Valid');
    }
    else {
      localStorage.removeItem('validLogin');
      console.log(res.data.message);
      setLoginValidation('Invalid');
    }
  }

  useEffect(() => {
    loginVerification();
  }, [])

  async function displayRazorpay() {
    // const res = await loadScript(
    //     "https://checkout.razorpay.com/v1/checkout.js"
    // );

    // if (!res) {
    //     alert("Razorpay SDK failed to load. Are you online?");
    //     return;
    // }

    // creating a new order
    const amt = {amount:cartData.cartTotal}
    const result = await axios.post(`${basePayUrl}/orders`,amt);

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: "rzp_test_lr64QgGNAIl7BO", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "ABC Corp.",
        description: "Test Transaction",
        // image: { logo },
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                items:cartData.items,
                amount: cartData.cartTotal
            };

            const result = await axios.post("http://localhost:4000/payment/success", data);

            alert(result.data.msg);
        },
        prefill: {
            name: "ABC Dey",
            email: "abc@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "ABC Dey Corporate Office",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

  return (
    <div>
        {loginValidation == 'Valid' ? <div>  <h2 style={{padding:"2vw"}}><i>Check Out Cart Iems..</i> 
            <Button style={{ width: "10vw", float: "right", color: "white", backgroundColor: "orange" }} onClick={() => {
        localStorage.removeItem('validLogin'); navigate('/');
      }
      }>Logout</Button></h2>
      <div style ={{display:"flex"}}>
      <div className='items-div'>
       
        {/* {console.log(cartData.items.length)} */}
         {cartData ? cartData.items.length != 0 ?  cartData.items.map(({ name, amount, image, variety, category, quantity }) => (
            <Products name={name} amount={amount} image={image} variety={variety} quantity={quantity} />
       )) : <p> There's a problem please try again later</p> : <p> There's a problem please try again later</p>}
    </div>
    <div className='payment-details'>
    {cartData ? cartData.items.length != 0 ? <div><p> <span style={{ border: "1px dashed black", padding: "1vw", color: "black", fontSize: "1.5vw", fontFamily: "sans-serif" }}>
            Total Price - ₹{cartData.cartTotal}</span></p>
            <p> + Free Shipping</p><br/>
    <p> <Button style={{ width: "15vw", color: "black", backgroundColor: "orange" }}
      // onClick={()=>navigate('/payment')}>
      onClick={displayRazorpay}>
            Proceed to Pay </Button> </p></div>
    :<p></p>:<p></p>
  }</div>
  </div>
  </div>: <p></p>}
      {loginValidation == 'Invalid' ? <h1>Invalid Login !!</h1> : <p></p>}
  </div>
  )
}

function Products({ name, amount, image, variety, quantity }) {

  return <div className='check-out-item'>
    <div><img src={image} /></div>
     <div><p><b>{name} - <span style={{backgroundColor:"orange"}}>₹{amount}</span></b></p>
        <p><b>{variety}</b></p>
        <p>quantity - <b>{quantity}</b></p></div> 
      
  </div>
}
export default CheckOut
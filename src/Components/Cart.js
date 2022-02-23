import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl, basemenuUrl } from '../App'
import axios from 'axios';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';


function Cart() {
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
    console.log(response.data.body);
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

  let deleteItem = async (delName, delAmount, delCategory, delQuantity) => {
    let objName = { name: delName, amount: delAmount, category: delCategory, quantity: delQuantity }
    let res = await axios.post(`${basemenuUrl}/delete-item/${token}`, objName);
    console.log(res.data);
    if (res.data.statusCode == 200) {
      getData();
      console.log(res.data.body);
    }
    else {
      console.log(res);
    }
  }

  let increment = async (name, amount, quantity) => {
    let objName = { name, amount, quantity: quantity + 1 }
    let res = await axios.post(`${basemenuUrl}/quantity-update/${token}`, objName);
    if (res.data.statusCode == 200) {
      getData();
      console.log(res);
    }
    else {
      console.log(res);
    }
  }

  let decrement = async (name, amount, quantity) => {
    if (parseInt(quantity) > 1) {
      let objName = { name, amount, quantity: quantity - 1 }
      let res = await axios.post(`${basemenuUrl}/quantity-update/${token}`, objName);
      if (res.data.statusCode == 200) {
        getData();
        console.log(res);
      }
      else {
        console.log(res);
      }
    }
  }

  return (
    <div style={{ height: "100vh", padding: "3vw" }}>
      {loginValidation == 'Valid' ? <div>   <Button style={{ width: "10vw", float: "right", color: "white", backgroundColor: "orange" }} onClick={() => {
        localStorage.removeItem('validLogin'); navigate('/');
      }
      }>Logout</Button>&emsp;

        <h2><i>Cart Items..</i>&emsp;&emsp;  {cartData ? cartData.items.length != 0 ? <span>
          <span style={{ border: "1px dashed black", padding: "1vw", width: "6vw", backgroundColor: "", color: "black", fontSize: "1.5vw", fontFamily: "sans-serif" }}>
            Total Price - ₹{cartData.cartTotal}</span> &emsp; &emsp; 
            <Button style={{ width: "25vw", color: "black", backgroundColor: "orange" }}
            onClick={()=>{navigate('/check-out')}}>
            Proceed to checkout </Button> </span> : <p></p> : <p></p>}</h2>
        <br /><div className='cart-div'>
          {cartData ? cartData.items.length != 0 ? cartData.items.map(({ name, amount, image, variety, category, quantity }) => (<div className="cart-list-item" >
            <Products name={name} amount={amount} image={image} variety={variety} category={category} quantity={quantity} />
            <IconButton aria-label="delete" style={{ color: "orange" }}>
              <RemoveCircleIcon onClick={() => decrement(name, amount, quantity)} />
            </IconButton> {quantity} <IconButton aria-label="delete" style={{ color: "orange" }}>
              <AddCircleIcon onClick={() => increment(name, amount, quantity)} />
            </IconButton><IconButton aria-label="delete" style={{ float: "right", color: "red" }} onClick={() => deleteItem(name, amount, category, quantity)}>
              <DeleteForeverIcon />
            </IconButton></div>)) : <div>Cart is Empty!</div> : <div>Cart is Empty!</div>}
        </div>
        <br />
      </div>
        : <p></p>}
      {loginValidation == 'Invalid' ? <h1>Invalid Login !!</h1> : <p></p>}

    </div>
  )
}

function Products({ name, amount, image, variety, category }) {

  return <div >
    <p><img src={image} />
      <p><b>{name} - ₹{amount}</b><br />
        <p>Type - <b>{variety}</b>&nbsp;{category}</p>
      </p></p>
  </div>
}



export default Cart
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import {baseUrl,basemenuUrl} from '../App'
import axios from 'axios';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function CustomPizza() {
const navigate = useNavigate();
const [loginValidation,setLoginValidation] = useState('')
const [menuData,setMenuData] = useState([]);
// const [base,setBase] = useState([]);
const getData = async()=>{
// const token = localStorage.getItem("validLogin")

  let response = await axios.get(`${basemenuUrl}/get-custom-menu`);
// console.log(response.data.body.filter((e)=>e.catergory == 'base'))
//   if(true)
//   {
//  setMenuData(response.data.body.filter((e)=>e.variety == 'customPizza'))
//  setBase(response.data.body.filter((e)=>e.catergory == "base"))
//   }
//   console.log(menuData,base);
setMenuData (response.data.body)

//  const customData = response.data.body.filter((e)=>e.variety == 'customPizza')
// const abc = await setMenuData(response.data.body);
// console.log("customData : "+customData)
// if(id==0)
// setMenuData(response.data.data.filter((e)=>e.variety == 'vegPizza'))
// else if(id==1)
// setMenuData(response.data.data.filter((e)=>e.variety == 'NonvegPizza'))
// else if(id==2)
// console.log("menuData : " ,menuData)
//       if(id==0)
//       await setMenuData(menuData.filter((e)=>e.variety == 'vegPizza'))
// else if(id==1)
// await setMenuData(menuData.filter((e)=>e.variety == 'NonvegPizza'))
// else if(id==2)
// await setMenuData(menuData.filter((e)=>e.variety == 'customPizza'))
//   let res = await axios.post(`${baseUrl}/verify-login/${token}`)
// //   let res = 100;
//    if(res.data.statusCode === 200)
//   {
//     console.log(res)
//     setLoginValidation('Valid');
// // console.log(menuData);
//   }
//   else
//   {
//     localStorage.removeItem('validLogin');
//     console.log(res.data.message);
//     setLoginValidation('Valid');
//    }
}

useEffect(()=>{
  getData();
},[])


return (
<div style={{height:"100vh",padding:"3vw"}}>
 <div>   <Button  style={{width:"10vw",float:"right", color: "black" ,backgroundColor:"orange"}} onClick={()=>{
              localStorage.removeItem('validLogin'); navigate('/');}
}>Logout</Button><h2 style={{padding:"0.5vw",border:"2px dotted orange",width:"30vw"}}>Customize your pizza...</h2> 
<br/>
<h4><i>Pizza Base</i></h4> <br/>
<div className='custom-list-item'>
{menuData.filter((e)=>e.category == 'base').map(({name,amount,image,category,variety})=>(
 <Products name={name} amount={amount} image={image} category={category} variety={variety}/>
//  <div className="menu-list-item" >
//    <p><img src={image}/></p>
//    <p>{name} - ₹{amount}</p>
// {/* <p>{variety}</p> */}
//  </div>
))}
</div><br/>
<h4><i>Pizza Sauce</i></h4> <br/>
<div className='custom-list-item'>
{menuData.filter((e)=>e.category == 'sauce').map(({name,amount,image,category,variety})=>(
 <Products name={name} amount={amount} image={image} category={category} variety={variety}/>
//  <div className="menu-list-item" >
//    <p><img src={image}/></p>
//    <p>{name} - ₹{amount}</p>
// {/* <p>{variety}</p> */}
//  </div>
))}
</div>
<br/>
<h4><i>Pizza Cheese</i></h4> <br/>
<div className='custom-list-item'>
{menuData.filter((e)=>e.category == 'cheese').map(({name,amount,image,category,variety})=>(
 <Products name={name} amount={amount} image={image} category={category} variety={variety}/>
//  <div className="menu-list-item" >
//    <p><img src={image}/></p>
//    <p>{name} - ₹{amount}</p>
// {/* <p>{variety}</p> */}
//  </div>
))}
</div>
<br/>
<h4><i>Veggies - Add any 3 veggies for free)</i></h4> <br/>
<div className='custom-list-item'>
{menuData.filter((e)=>e.category == 'veggies').map(({name,amount,image,category,variety})=>(
 <Products name={name} amount={amount} image={image} variety={variety} category={category}/>
//  <div className="menu-list-item" >
//    <p><img src={image}/></p>
//    <p>{name} - ₹{amount}</p>
// {/* <p>{variety}</p> */}
//  </div>
))}
</div>
<br/>
<h4><i>Meat - Add a Meat for free</i></h4> <br/>
<div className='custom-list-item'>
{menuData.filter((e)=>e.category == 'meat').map(({name,amount,image,category,variety})=>(
 <Products name={name} amount={amount} image={image} category={category} variety={variety}/>
//  <div className="menu-list-item" >
//    <p><img src={image}/></p>
//    <p>{name} - ₹{amount}</p>
// {/* <p>{variety}</p> */}
//  </div>
))}
</div>
<br/>
  </div>
  
 {/* {loginValidation == 'Invalid'? <h1>Invalid Login !!</h1>:<p></p>} */}
  
</div>
)
}

function Products({ name, amount, image, category, variety }) {
  const token = localStorage.getItem("validLogin")

  const addToCart = async(name, amount, image, category, variety) => {
    let newItem = {
      name,
      amount,
      image,
      category,
      variety
    }
    let response = await axios.post(`${basemenuUrl}/add-cart/${token}`,newItem);
console.log(response.data.message)
  }
  return <div className="custom-list-item" >
    <p><img src={image} />
      <p>{name} - ₹{amount} <br/><p><Button  endIcon={<AddShoppingCartIcon />}style={{ fontSize:"0.8vw", fontFamily: "Cursive", backgroundColor: "orange", color: "black", float: "right" }}
        onClick={() => addToCart(name, amount, image, category, variety )}><b>Add to cart</b> </Button></p></p></p>
    {/* {console.log(name)} */}
  </div>
}


export default CustomPizza
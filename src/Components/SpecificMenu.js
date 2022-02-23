import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import {baseUrl,basemenuUrl} from '../App'
import axios from 'axios';
// import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

function SpecificMenu() {
    const {id} = useParams();
    const navigate = useNavigate();
  const [loginValidation,setLoginValidation] = useState('')
  const [menuData,setMenuData] = useState([]);
  const loginVerification = async()=>{
    const token = localStorage.getItem("validLogin")

    let response = await axios.get(`${basemenuUrl}/get-menu`);
console.log(response.data.body)
if(id==0)
 setMenuData(response.data.body.filter((e)=>e.variety == 'vegPizza'))
 else if(id==1)
 setMenuData(response.data.body.filter((e)=>e.variety == 'NonvegPizza'))
//  else if(id==2)
//  setMenuData(response.data.body.filter((e)=>e.variety == 'customPizza'))

//       if(id==0)
//       await setMenuData(menuData.filter((e)=>e.variety == 'vegPizza'))
// else if(id==1)
// await setMenuData(menuData.filter((e)=>e.variety == 'NonvegPizza'))
// else if(id==2)
// await setMenuData(menuData.filter((e)=>e.variety == 'customPizza'))
    let res = await axios.post(`${baseUrl}/verify-login/${token}`)
    if(res.data.statusCode===200)
    {
      console.log(res.data)
      setLoginValidation('Valid');
console.log(menuData);
    }
    else
    {
      localStorage.removeItem('validLogin');
      console.log(res.data.message);
      setLoginValidation('Invalid');
     }
  }

  useEffect(()=>{
    loginVerification();
  },[])

  return (
<div style={{height:"100vh",padding:"3vw"}}>
   {loginValidation == 'Valid' ? <div>   <Button  style={{width:"10vw",float:"right", color: "black" ,backgroundColor:"orange"}} onClick={()=>{
                localStorage.removeItem('validLogin'); navigate('/');}
}>Logout</Button><h2><i>Pizza Menu...</i></h2> 
 <br/><div className='page-div'>
 {/* {id == 0? setMenuData(menuData.filter((e)=>e.variety == 'vegPizza')):<></>}
 {id == 1? setMenuData(menuData.filter((e)=>e.variety == 'NonvegPizza')):<></>}
 {id == 2? setMenuData(menuData.filter((e)=>e.variety == 'customPizza')):<></>} */}

 {menuData.map(({name,amount,image,category,variety})=>(
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
    : <p></p>}
   {loginValidation == 'Invalid'? <h1>Invalid Login !!</h1>:<p></p>}
    
  </div>
  )
}

function Products({name,amount,image,category,variety}){

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
    return <div className="menu-list-item" >
    <p><img src={image}/></p>
    <p>{name} - ₹{amount}</p><br/>
    <Button style={{ fontSize:"1vw",fontFamily: "Cursive", backgroundColor: "orange", color: "black", float: "right" }}
        onClick={() => addToCart(name,amount,image,category,variety)}>Add to cart</Button>
  </div>
  }

export default SpecificMenu


import React, { useEffect, useState } from 'react'
// import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import {baseUrl,basemenuUrl} from '../App'
import axios from 'axios';

function Menu() {
  const navigate = useNavigate();
  const [loginValidation,setLoginValidation] = useState('')
  const [menuData,setMenuData] = useState([]);
  const loginVerification = async()=>{
    const token = localStorage.getItem("validLogin")
    let res = await axios.post(`${baseUrl}/verify-login/${token}`)
    if(res.data.statusCode===200)
    {
      console.log(res.data)
      setLoginValidation('Valid');
    }
    else
    {
      localStorage.removeItem('validLogin');
      console.log(res.data.message);
      setLoginValidation('Invalid');
    }
    if(loginValidation=='Valid'){
    let response = await axios.get(`${basemenuUrl}/get-menu`);
    if(response.data.statusCode == 200)
    {
setMenuData(response.data.data)
console.log("Data " + response)
    }
    else{
console.log("some Prob!, veiw console")
    }
  }
}

  useEffect(()=>{
    loginVerification()
  },[])

  return <div className='page-div'>
   {loginValidation == 'Valid' ? <div><h2><i>Pizza Menu</i></h2> 
 {/* {menuData.map(({name,amount,image,variety})=>{<div style={{width:"100%",height:"20vw"}}>
   <p>{name}</p>
   <p>{amount}</p>
   <p><img src={image} style={{width:"4vw",height:"4vw"}} /></p>
<p>{variety}</p>
 </div>})} */}
    <Button  variant="outline-dark" style={{width:"10vw",float:"left"}} onClick={()=>{
                localStorage.removeItem('validLogin'); navigate('/');}
}>Logout</Button> <br/>
    </div>
    : <p></p>}
   {loginValidation == 'Invalid'? <h1>Invalid Login !!</h1>:<p></p>}
    
  </div>

}

export default Menu
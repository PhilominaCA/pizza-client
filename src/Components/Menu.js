import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import {baseUrl,basemenuUrl} from '../App'
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';


function Menu() {
  const navigate = useNavigate();
  const [loginValidation,setLoginValidation] = useState('')
  // const [menuData,setMenuData] = useState([]);
  const loginVerification = async()=>{
    const token = localStorage.getItem("validLogin")

    // let response = await axios.get(`${basemenuUrl}/get-menu`);
// console.log(response.data.data)
// setMenuData(response.data.data)

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
//     if(loginValidation=='Valid' && response.data.statusCode == 200)
//     {
// // setMenuData(response.data.data)
// console.log("Data " + response)
//     }
//     else{
// console.log("some Prob!, veiw console")
//     }
  }


  useEffect(()=>{
    loginVerification()
  },[])

  return <div style={{height:"100vh",padding:"3vw"}}>
   {loginValidation == 'Valid' ? <div>   <Button  style={{width:"10vw",float:"right", color: "black" ,backgroundColor:"orange"}} onClick={()=>{
                localStorage.removeItem('validLogin');  navigate('/');}
}>Logout</Button><h2><i>Pizza varieties...</i></h2> 
 <br/><div className='page-div'>
 <div className="menu-list-item" >
  <p><img src="https://static.toiimg.com/thumb/53351352.cms?imgsize=151967&width=800&height=800"/></p>
  <p>VEG PIZZA MENU &emsp; <Button variant="contained"
        endIcon={<SendIcon style={{ color: "black" }} />}
        style={{ fontFamily: "Cursive", backgroundColor: "orange", color: "black" ,float:"right"}}
        onClick={() =>{ navigate('/menu/0')}}> Menu</Button></p>
</div>

 <div className="menu-list-item" >
  <p><img src="https://static.toiimg.com/thumb/53339084.cms?imgsize=85489&width=800&height=800"/></p>
  <p>NON- VEG PIZZA MENU &emsp;<Button variant="contained"
        endIcon={<SendIcon style={{ color: "black" }} />}
        style={{ fontFamily: "Cursive", backgroundColor: "orange", color: "black" ,float:"right"}}
        onClick={() => navigate('/menu/1')}> Menu</Button></p>
</div>

 <div className="menu-list-item" >
  <p><img src="https://netdna.coolthings.com/wp-content/uploads/2016/01/your-slyce-3.jpg"/></p>
  <p>CUSTOMIZE PIZZA &emsp; <Button variant="contained"
        endIcon={<SendIcon style={{ color: "black" }} />}
        style={{ fontFamily: "Cursive", backgroundColor: "orange", color: "black" ,float:"right"}}
        onClick={() => navigate('/menu/custom-pizza')}> Menu</Button></p>
</div>

 {/* {menuData.map(({name,amount,image})=>(
  <Products name={name} amount={amount} image={image}/>
//  <div className="menu-list-item" >
//    <p><img src={image}/></p>
//    <p>{name} - ₹{amount}</p>
// {/* <p>{variety}</p> }
//  </div>
 ))} */}

 </div>
 <br/>
    </div>
    : <p></p>}
   {loginValidation == 'Invalid'? <h1>Invalid Login !!, Please Login to view</h1>:<p></p>}
    
  </div>

}

// function Products({name,amount,image}){
//   return <div className="menu-list-item" >
//   <p><img src={image}/></p>
//   <p>{name} - ₹{amount}</p>
// </div>
// }
export default Menu


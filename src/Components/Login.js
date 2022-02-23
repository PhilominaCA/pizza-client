import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link,useParams} from 'react-router-dom'
import { RiArrowRightLine,RiLoginCircleLine } from "react-icons/ri";
import {baseUrl} from '../App'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'


function Login() {
const navigate = useNavigate();
  let [email,setEmail] = useState('');
  let [password,setPassword] = useState('');
  const {role} = useParams();
  let [msg,setMsg] = useState('');

 let handleSubmit = async()=>{
  const loginData = {
    email,
    password
  }
  let res = await axios.post(`${baseUrl}/login/${role}`,loginData)
  if(res.data.statusCode===200)
  {
  //  setLog(true)
    console.log(res.data)
    localStorage.setItem("validLogin", res.data.token)
    if(role ==0)
    navigate('/menu');
    if(role == 1)
    navigate('/admin-page');
  }
  else
  {
    console.log(res.data.message);
    setMsg(res.data.message)
  }
}
   
  return (
    <div>
<div className='dasboard-div'>
    <h3>Login</h3><hr/>
    <p style={{color:"red"}}>{msg}</p>
    <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
  </Form.Group>
  <Link to="/forgot-password">Forgot Password?</Link><br/><br/>
  <Button variant="outline-dark" style={{width:"100%"}} onClick={()=>handleSubmit()}>
    Login <RiArrowRightLine/>
  </Button>
</Form>
</div>
    </div>
  )
}

export default Login
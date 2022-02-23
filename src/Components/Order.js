import React, { useEffect, useState } from 'react'
import { baseUrl, baseOrderUrl } from '../App'

function Order() {
  const navigate = useNavigate();
  const [loginValidation, setLoginValidation] = useState('')
  const [orderData, setOrderData] = useState([]);
  const token = localStorage.getItem("validLogin")

  const getData = async () => {
    let response = await axios.get(`${baseOrderUrl}/view-order/${token}`);
    if (response.data.statusCode === 200) {
      setOrderData(response.data.body)
    }
    else {
      console.log(response.data);

    }
  }

  const loginVerification = async () => {

    let response = await axios.get(`${baseOrderUrl}/view-order/${token}`);
    setOrderData(response.data.body)
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
  return (
    <div><h2><i>Your Orders</i>&emsp;&emsp;  {orderData ? orderData.order.length != 0 ? <div>
    {orderData.order.map(({orderID,orderTotal,tracking,items})=><OrderList orderID={orderID} orderTotal={orderTotal} tracking={tracking} items={items}/>)}
    </div> 
      : <p></p> : <p></p>}</h2></div>
  )
}


function OrderList({orderID,orderTotal,tracking,items}) {

  return <div>
    <p>{orderID}<span>Amount - {orderTotal}</span></p>
    <p>OrderStatus - {tracking[tracking.length-1]}
    {orderData.order.items.map(({image,name,amount})=><div><p><img src={image}/></p>
      <p><b>{name} - ₹{amount}</b><br />
      </p></div>)}
      </p>
  </div>
}
export default Order
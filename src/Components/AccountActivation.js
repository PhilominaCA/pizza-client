import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import {baseUrl} from '../App'

function AccountActivation() {
    const {token} =useParams();
    const [activationStatus,setStatus] = useState('');
    const activateUser = async () => {
        try {
            let res = await axios.post(`${baseUrl}/account-activation/${token}`)
            console.log(res);
            if(res.data.statusCode ==200)
            setStatus(res.data.message);
            else
            setStatus('Account activation failed, due to : ' + res.data.message);

        }
        catch (err) {
            alert('There is a problem, please view error in console');
            console.log(err);
            setStatus('Account activation failed due to some issues')
          }
        }
          useEffect(() => {
            activateUser();
          }, [])

  return (
    <div>
        {activationStatus }
    </div>
  )
}

export default AccountActivation
import React from 'react'
import { useParams } from 'react-router-dom';

function SignUpStatus() {
    const {id} = useParams();
    
  return <>
   {id? <div>
        Great!, You will receive an account activation link via email
        Kindly check and activate your account
    </div>:<div>Oops! There is a Problem, please try again later</div>
   }
    </>
}

export default SignUpStatus
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';


const ButtonLogin = () => {
    const {loginWithRedirect} =  useAuth0()
  return (
    <>
    <button onClick={()=>loginWithRedirect()}> Account </button>
    </>
  )
}

export default ButtonLogin
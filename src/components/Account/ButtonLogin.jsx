import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineUser } from "react-icons/ai"

const ButtonLogin = () => {
  const { loginWithPopup } = useAuth0();
  return (
    <div title="Log In" className="nav__user-image">
      <div className="nav__logo" onClick={() => loginWithPopup()} >
        <AiOutlineUser size={48}/>
      </div>
    </div>
  );
};

export default ButtonLogin;

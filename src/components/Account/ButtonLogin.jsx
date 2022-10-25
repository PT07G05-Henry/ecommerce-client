import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LOGO from "../../assets/Logo.svg";

const ButtonLogin = () => {
  const { loginWithPopup } = useAuth0();
  return (
    <div className="nav__user-image">
      <div className="nav__logo">
        <img src={LOGO} alt="logo" onClick={() => loginWithPopup()} />
      </div>
    </div>
  );
};

export default ButtonLogin;

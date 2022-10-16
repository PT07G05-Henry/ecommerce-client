import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogin = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button className="btn btn-primary" onClick={() => loginWithRedirect()}>
      LogIn
    </button>
  );
};

export default ButtonLogin;

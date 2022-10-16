import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ButtonLogOut = ({ style }) => {
  const { logout } = useAuth0();
  return (
    <button
      className="btn btn-primary"
      onClick={() => logout({ returnTo: window.location.origin })}
      style={style}
    >
      Log Off
    </button>
  );
};

export default ButtonLogOut;

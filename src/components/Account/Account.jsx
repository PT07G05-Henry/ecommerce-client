import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonLogOut from "./ButtonLogOut";
import "./account.css";

const Account = () => {
  const { user } = useAuth0();
  const [show, setShow] = useState(false);
  console.log(user);
  return (
    <>
      <div className="nav__user-image">
        <img
          src={user.picture}
          alt={user.name}
          onClick={() => {
            setShow(!show);
          }}
        />
      </div>
      <ButtonLogOut style={show ? {} : { display: "none" }} />
    </>
  );
};

export default Account;

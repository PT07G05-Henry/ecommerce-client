import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonLogOut from "./ButtonLogOut";
import CreateProduct from "../CreateProduct/CreateProduct";
import "./account.css";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate()
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
      <h3 style={show ? {} : { display: "none" }} onClick={()=> navigate("/createProduct")}>Create Product</h3>
    </>
  );
};

export default Account;

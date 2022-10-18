import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonLogOut from "./ButtonLogOut";
import CreateProduct from "../CreateProduct/CreateProduct";
import "./account.css";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
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
      <div className="nav__user-menu" style={show ? {} : { display: "none" }}>
        <button className="btn btn-primary" onClick={() => navigate("/create/product")}>
          Create Product
        </button>
        <ButtonLogOut />
      </div>
    </>
  );
};

export default Account;

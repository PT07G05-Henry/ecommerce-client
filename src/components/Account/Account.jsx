import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonLogOut from "./ButtonLogOut";
import "./account.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getThisUser, selectThisUserRoles } from "../../store/thisUser";

const Account = () => {
  const navigate = useNavigate();
  const { user, getIdTokenClaims } = useAuth0();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const roles = useSelector(selectThisUserRoles);
  useEffect(() => {
    roles[0] === "Guest" &&
      getIdTokenClaims()
        .then((response) => {
          console.log(response);
          const { sid } = response;
          const APIToken = sid;
          console.log(sid);
          dispatch(getThisUser({ user: user, sid: sid }));
        })
        .catch((error) => {
          console.error(error);
        });
  }, [user]);
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
      <div
        className="box nav__user-menu"
        style={show ? {} : { display: "none" }}
      >
        <button
          className="btn btn-primary"
          onClick={() => navigate("/create/product")}
        >
          Create Product
        </button>
        <ButtonLogOut />
      </div>
    </>
  );
};

export default Account;

import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonLogOut from "./ButtonLogOut";
import "./account.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getThisUser,
  selectThisUserRoles,
  selectThisUser,
} from "../../store/thisUser";

const Account = () => {
  const navigate = useNavigate();
  const { user, getIdTokenClaims } = useAuth0();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const roles = useSelector(selectThisUserRoles);
  const dataUser = useSelector(selectThisUser);
  useEffect(() => {
    roles[0] === "Guest" &&
      getIdTokenClaims()
        .then((response) => {
          const { sid } = response;
          console.log("sid", sid);
          dispatch(getThisUser({ user: user, sid: sid }));
        })
        .catch((error) => {
          console.error(error);
        });
  }, [dispatch]);

  useEffect(() => {
    console.log("roles", roles);
  }, [roles]);
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
        {!(roles.find((r) => r === "Guest") === "Guest") && (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        )}
        <ButtonLogOut />
      </div>
    </>
  );
};

export default Account;

{
  /* {(roles.find((r)=>r === "Admin") === "Admin" || roles.find((r)=>r==="Superadmin") === "Superadmin") && (
  <button
    className="btn btn-primary"
    onClick={() => navigate("/create/product")}
  >
    Create Product
  </button>
)} */
}

import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonLogOut from "./ButtonLogOut";
import "./account.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getThisUser,
  selectThisUserRoles,
  selectThisUserRolesWithoutFake,
  selectFakeRol,
  setFakeRol,
  fakeRoles,
} from "../../store/thisUser";

const Account = () => {
  const navigate = useNavigate();
  const { user, getIdTokenClaims } = useAuth0();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const trueRol = useSelector(selectThisUserRolesWithoutFake);
  const roles = useSelector(selectThisUserRoles);
  const fakeRol = useSelector(selectFakeRol);
  const [showSelectFakeRol, setShowSelectFakeRol] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    roles[0] === "Guest" &&
      getIdTokenClaims()
        .then((response) => {
          const { sid } = response;
          dispatch(getThisUser({ user: user, sid: sid }));
        })
        .catch((error) => {
          console.error(error);
        });
  }, [dispatch]);
  console.log(process.env.REACT_APP_ROL_WITH_FAKE_ROL);
  return (
    <>
      <div
        title="User Menu"
        className={
          !(
            pathname === "/" ||
            pathname === "/catalog" ||
            pathname === "/cart" ||
            pathname === "/aboutus"
          )
            ? "nav__user-image nav__user-imageActive"
            : "nav__user-image"
        }
      >
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
            onClick={() => {
              navigate("/dashboard");
              setShow(false);
            }}
          >
            Dashboard
          </button>
        )}
        <ButtonLogOut />
      </div>
      <div
        className="fakeRol__point"
        style={
          process.env.REACT_APP_ROL_WITH_FAKE_ROL &&
          process.env.REACT_APP_ROL_WITH_FAKE_ROL === trueRol
            ? undefined
            : { display: "none" }
        }
        onClick={() => {
          setShowSelectFakeRol(!showSelectFakeRol);
        }}
      />
      <div
        className="box-dry fakeRol__modal"
        style={showSelectFakeRol ? undefined : { display: "none" }}
      >
        <select
          value={fakeRol}
          onChange={({ target }) => {
            dispatch(setFakeRol(target.value));
            setShowSelectFakeRol(false);
          }}
          id=""
        >
          {Object.keys(fakeRoles).map((key) => (
            <option value={fakeRoles[key]}>{fakeRoles[key]}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Account;

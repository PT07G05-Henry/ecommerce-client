import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./navBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonLogin from "../Account/ButtonLogin";
import Account from "../Account/Account";
import logo from '../../assets/Logo1.png'

export default function NavBar() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <div className="container nav__spacer" />
      <nav className="container nav">
        <img className="nav__logo" src={logo} alt="logo" />
        <Link className="btn btn-primary" to="/">
          Home
        </Link>
        <Link className="btn btn-primary" to="/catalog">
          Catalog
        </Link>
        <SearchBar />
        {isAuthenticated ? <Account /> : <ButtonLogin />}
      </nav>
      <div className="container nav__spacer" />
    </>
  );
}
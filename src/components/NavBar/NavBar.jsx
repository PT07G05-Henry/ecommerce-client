import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./navBar.css";
import { useAuth0 } from '@auth0/auth0-react';
import ButtonLogin from '../Account/ButtonLogin'
import Account from '../Account/Account'

export default function NavBar() {
  const { isAuthenticated } = useAuth0()
  return (
    <>
      <div className="container nav__spacer" />
      <nav className="container nav">
        <Link className="btn btn-primary" to="/home">
          HOME
        </Link>
        <Link className="btn btn-primary" to="/products">
          CART
        </Link> 
        { isAuthenticated ? < Account /> : < ButtonLogin />}
        <SearchBar />
      </nav>
      <div className="container nav__spacer" />
    </>
  );
}

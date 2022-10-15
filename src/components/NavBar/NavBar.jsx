import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./navBar.css";

export default function NavBar() {
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
        <Link className="btn btn-primary" to="/account">
          ACCOUNT
        </Link>
        <SearchBar />
      </nav>
      <div className="container nav__spacer" />
    </>
  );
}

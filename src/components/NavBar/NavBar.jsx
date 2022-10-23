import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Categories from "../Categories/Categories"
import "./navBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonLogin from "../Account/ButtonLogin";
import Account from "../Account/Account";

import { useDispatch, useSelector } from "react-redux";
import { getCategories, selectCategories } from "../../store/api";

import logo from '../../assets/Logo1.png'


export default function NavBar() {
  const { isAuthenticated, get } = useAuth0();
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  useEffect(() => {
    categories &&
      (categories[0].toBeField || categories[0].error) &&
      dispatch(getCategories());
      console.log(categories)
  }, [categories]);
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
        {(
          categories.length > 1 &&
        <Categories
          data={categories}
          dispatch={() => {
            dispatch(getCategories());
          }}
        />
        )}
        <SearchBar />
        {isAuthenticated ? <Account /> : <ButtonLogin />}
      </nav>
      <div className="container nav__spacer" />
    </>
  );
}



  
 
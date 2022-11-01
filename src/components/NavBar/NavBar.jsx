
import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Categories from "../Categories/Categories"
import "./navBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonLogin from "../Account/ButtonLogin";
import Account from "../Account/Account";
import { SlHome , SlBookOpen } from "react-icons/sl"
import { AiOutlineShoppingCart , AiOutlineMessage } from "react-icons/ai"
import {MdRemoveShoppingCart} from "react-icons/md"
import {selectCarts} from "../../store/cart"
import { useSelector } from "react-redux";
import {selectThisUserRoles} from "../../store/thisUser";
import LOGO from "../../assets/Logo.svg";
import { useEffect } from "react";

export default function NavBar() {
  const cart = useSelector(selectCarts)
  const navigate = useNavigate();
  const rol = useSelector(selectThisUserRoles)
  const { isAuthenticated } = useAuth0();
  const buttonSize = 32;

    return (<>
    <div className="nav__container">
      <nav className="nav">
        <button className="nav__button" onClick={()=>navigate("/")} ><SlHome size={buttonSize} /></button>
        <button className="nav__button" onClick={()=>navigate("/catalog")} ><SlBookOpen size={buttonSize} /></button>
        <div className="nav__middleSpace"/>
        <button className="nav__button tooltip__cart" onClick={()=>{if(rol[0] !== "Admin" ){navigate("/cart")}}} >{rol[0] !== "Admin" ? <AiOutlineShoppingCart size={buttonSize} />: <MdRemoveShoppingCart size={buttonSize} /> }{cart.length >= 1 &&<span class="tooltiptext">{cart.length}</span>}</button>
        <button className="nav__button" onClick={()=>navigate("/")} ><AiOutlineMessage size={buttonSize} /></button>
      </nav>
    </div>
    <div className="nav__container">      
        {isAuthenticated ? <Account /> : <ButtonLogin />}
    </div>
    </>
  );
}
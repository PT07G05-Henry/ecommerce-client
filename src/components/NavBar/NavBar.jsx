import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonLogin from "../Account/ButtonLogin";
import Account from "../Account/Account";
import { SlHome, SlBookOpen } from "react-icons/sl";
import { AiOutlineShoppingCart, AiOutlineMessage } from "react-icons/ai";
import { MdRemoveShoppingCart } from "react-icons/md";
import { selectItemsInCart } from "../../store/cart";
import { useSelector } from "react-redux";
import { selectThisUserRoles } from "../../store/thisUser";

export default function NavBar() {
  const cart = useSelector(selectItemsInCart);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const rol = useSelector(selectThisUserRoles);
  const { isAuthenticated } = useAuth0();
  const buttonSize = 32;
  const navigateToCart = () => {
    if (rol[0] !== "Admin") {
      navigate("/cart");
    }
  };

  return (
    <>
      <div className="nav__container">
        <nav className="nav">
          <button
            title="Home"
            className={
              pathname === "/" ? "nav__button nav__active" : "nav__button"
            }
            onClick={() => navigate("/")}
          >
            <SlHome size={buttonSize} />
          </button>
          <button
            title="Catalog"
            className={
              pathname === "/catalog"
                ? "nav__button nav__active"
                : "nav__button"
            }
            onClick={() => navigate("/catalog")}
          >
            <SlBookOpen size={buttonSize} />
          </button>
          <div className="nav__middleSpace">
            {cart > 0 && (
              <span
                title={`${cart} items in the cart`}
                class="nav__cart-counter"
                onClick={navigateToCart}
              >
                {cart}
              </span>
            )}
          </div>
          <button
            title="Cart"
            className={
              pathname === "/cart"
                ? "nav__button nav__active tooltip__cart"
                : "nav__button tooltip__cart"
            }
            onClick={navigateToCart}
          >
            {rol[0] !== "Admin" ? (
              <AiOutlineShoppingCart size={buttonSize} />
            ) : (
              <MdRemoveShoppingCart size={buttonSize} />
            )}
          </button>
          <button
            title="About Us"
            className={
              pathname === "/aboutus"
                ? "nav__button nav__active"
                : "nav__button"
            }
            onClick={() => navigate("/aboutus")}
          >
            <AiOutlineMessage size={buttonSize} />
          </button>
        </nav>
      </div>
      <div className="nav__container">
        {isAuthenticated ? <Account /> : <ButtonLogin />}
      </div>
    </>
  );
}

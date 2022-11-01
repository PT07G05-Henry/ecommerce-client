import React from "react";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import CardCart from "../CardCart/CardCart";
import "./cart.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {selectThisUserRoles} from "../../store/thisUser"
import ButtonGenerateMPLink from "../MercadoPago/ButtonGenerateMPLink"


export default function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const rol = useSelector(selectThisUserRoles)
  const [totalPrice, setTotalPrice] = useState();
  const [totalItems, setTotalItems] = useState();
  const { loginWithPopup } = useAuth0();
  useEffect(() => {
    const value = cart.reduce((accumulator, object) => {
      return accumulator + Number(object.price) * Number(object.qty);
    }, 0);
    setTotalPrice(value);
    const numItems = cart.length;
    setTotalItems(numItems);
    console.log(rol)
  }, [cart]);

  return (
    <div className="container cart__container">
      <div className="CartTitle">
        <h1>Cart</h1>
        {cart.length > 0 ? (
          <>
            <h2>
              Total Items: <span className="totalText">{totalItems}</span>
            </h2>
            <h2>
              Total Price:{" "}
              <span className="totalText">
                {"$" + Number(totalPrice).toFixed(2)}
              </span>
            </h2>
            {rol[0]=== "Guest" ? <input
              type="button"
              className="btn cart__btn"
              value="Proceed to checkout"
              onClick={() => {
                loginWithPopup()
              }}
            ></input>:
            <ButtonGenerateMPLink totalPrice={Number(totalPrice).toFixed(2)} cart={cart}/>}
            
            <h2>These are the selected products</h2>
          </>
        ) : (
          <>
            <h2>Your shopping cart is empty</h2>
            <h3>
              Please visit <Link to="/catalog">Calatog</Link>
            </h3>
          </>
        )}
      </div>

      {cart?.map((c) => {
        return (
          <div key={c.id}>
            <CardCart
              id={c.id}
              images={c.images}
              name={c.name}
              price={c.price}
              description={c.description}
              stock={c.stock}
              categoriesId={c.categoriesId}
              categoriesName={c.categoriesName}
              isCreated={true}
              handleDelete={""}
              qty={c.qty}
            />
          </div>
        );
      })}
    </div>
  );
}
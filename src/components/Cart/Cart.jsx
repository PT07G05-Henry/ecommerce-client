import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardCart from "../CardCart/CardCart";
import "./cart.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { selectThisUserRoles } from "../../store/thisUser";
import ButtonGenerateMPLink from "../MercadoPago/ButtonGenerateMPLink";
import { setItem } from "../../store/cart";
import OrderResum from "../MercadoPago/OrderResum";
import products from "../../store/products";
import ButtonGenerateOrder from "../MercadoPago/ButtonGenerateOrder";
import ButtonCancelOrder from "../MercadoPago/ButtonCancelOrder";
import axios from "axios";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const rol = useSelector(selectThisUserRoles);
  const [totalPrice, setTotalPrice] = useState();
  const [totalItems, setTotalItems] = useState();
  const [userId, setUserId] = useState();
  const [items, setItems] = useState(  userId ? JSON.parse(localStorage.getItem(`User${userId}`)) : JSON.parse(localStorage.getItem(`User${userId}`))

  );
  const [button, setButton] = useState(false);
  const [urlMP, setUrlMP] = useState("");

  const { loginWithPopup, getIdTokenClaims } = useAuth0();

  const remove = (idValue) => {
    setItems(items.filter((e) => e.id !== idValue));
  };

  useEffect(() => {
    getIdTokenClaims()
      .then((r) => r.sid)
      .then((sid) => axios.get(`https://localhost:3001/users?sid=${sid}`))
      .then((r) =>{setUserId(r.data.id)});
    if (rol[0] === "User") {
      setItems(JSON.parse(localStorage.getItem(`User${userId}`)));
    }
  }, [rol[0]]);

  useEffect(() => {
    console.log(
      "revisar esto",
      JSON.parse(localStorage.getItem(`User${userId}`))
    );

    localStorage.setItem(`User${userId}`, JSON.stringify(cart));
    items?.map((e) => dispatch(setItem(e)));

    const value = cart.reduce((accumulator, object) => {
      return accumulator + Number(object.price) * Number(object.qty);
    }, 0);

    setTotalPrice(value);
    const numItems = cart.length;
    setTotalItems(numItems);
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
            {rol[0] === "Guest" ? (
              <input
                type="button"
                className="btn cart__btn"
                value="Proceed to checkout"
                onClick={() => {
                  loginWithPopup();
                }}
              ></input>
            ) : button ? (
              <ButtonGenerateOrder
                setButton={setButton}
                cart={cart}
                total_price={Number(totalPrice).toFixed(2)}
                setUrlMP={setUrlMP}
              />
            ) : (
              <div>
                <ButtonGenerateMPLink
                  totalPrice={Number(totalPrice).toFixed(2)}
                  cart={cart}
                />{" "}
                <ButtonCancelOrder userId={userId} setItems={setItems}/>
              </div>
            )}
            {button && (
              <OrderResum
                totalPrice={Number(totalPrice).toFixed(2)}
                data={cart}
              />
            )}
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
              remove={remove}
              qty={c.qty}
            />
          </div>
        );
      })}
    </div>
  );
}
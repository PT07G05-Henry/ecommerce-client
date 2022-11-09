import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardCart from "../CardCart/CardCart";
import "./cart.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { selectThisUserRoles, selectThisUser } from "../../store/thisUser";
import ButtonGenerateMPLink from "../MercadoPago/ButtonGenerateMPLink";
import { selectCarts } from "../../store/cart";
import OrderResum from "../MercadoPago/OrderResum";

import ButtonGenerateOrder from "../MercadoPago/ButtonGenerateOrder";
import ButtonCancelOrder from "../MercadoPago/ButtonCancelOrder";


export default function CartTest() {

  const cart = useSelector(selectCarts);
  const rol = useSelector(selectThisUserRoles);
  const user = useSelector(selectThisUser);
  const [totalPrice, setTotalPrice] = useState();
  const [totalItems, setTotalItems] = useState();
  const [button, setButton] = useState(false);
  const [urlMP, setUrlMP] = useState("");

  const { loginWithPopup } = useAuth0();

  useEffect(() => {
    const value = cart.reduce((accumulator, object) => {
      return accumulator + Number(object.price) * Number(object.qty);
    }, 0);
    const numItems = cart.length;
    setTotalPrice(value);
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
                  userId={user.userDb.id}
                />{" "}
                <ButtonCancelOrder userId={user.userDb.id}/>
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
              qty={c.qty}
            />
          </div>
        );
      })}
    </div>
  );
}
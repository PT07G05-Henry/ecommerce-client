import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./buttongeneratemplink.css";
import api, { endPoint } from "../../lib/api";
import { useState } from "react";

export default function ButtonGenerateOrder({ setButton, cart, total_price, setUrlMP }) {
  const products = cart.map(({ name, qty, price, id }) => ({
    id,
    name,
    qty,
    price,
  }));
  products.forEach((e) => {
    e["title"] = e["name"];
    delete e["name"];
    e["quantity"] = Number.parseInt(e["qty"]);
    delete e["qty"];
    e["unit_price"] = Number(e["price"]);
    delete e["price"];
    e["currency_id"] = "ARS";
  });

  function handler() {
    api
      .post(endPoint.pay, { data: { products: cart } })
      .then((r) => {
        if (r.data === "proceed to buy") {
          setButton(true);
        }
      })
      .then(() =>
        api.post(endPoint.mercado, {
          data: { total_price: total_price, products: products },
        }).then((r)=>{console.log(r.data);setUrlMP(r.data)})
      );
  }

  return (
    <>
      <input
        className="btn cart__btn cart__btn-aprove"
        value="Generate Order"
        type="button"
        onClick={() => {
          handler();
        }}
      ></input>
    </>
  );
}

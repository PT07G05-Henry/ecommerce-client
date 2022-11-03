import axios from "axios";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./buttongeneratemplink.css"
import api, { endPoint } from "../../lib/api";
import { useState } from "react";

export default function ButtonGenerateMPLink({totalPrice, cart}) {
  const { getIdTokenClaims } = useAuth0();
  const [sended, setSended] = useState(false)
  const products = cart.map(({name, qty, price, id})=>({id, name, qty, price }));
  products.forEach(e => {
    e["title"] = e["name"];
    delete e["name"];
    e["quantity"] = e["qty"];
    delete e["qty"]
    e["unit_price"] = e["price"];
    delete e["price"];
    e["currency_id"] = "ARS"
  });

  function findLinkMP() {
    api.post(endPoint.mercado,{data: {total_price: totalPrice,
      products: products, }}).then(r=>window.open(r.data, '_blank', "top=200,left=400,width=1000,height=700"))
  }

  return (
    <>
      <input
        className="btn cart__btn cart__btn-aprove"
        value="Proceed to checkout"
        type="button"
        onClick={() => {
          findLinkMP();
        }}
      ></input>
    </>
  );
}

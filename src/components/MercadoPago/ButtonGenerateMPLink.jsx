import axios from "axios";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function ButtonGenerateMPLink({totalPrice, cart}) {
  const { getIdTokenClaims } = useAuth0();
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
    getIdTokenClaims()
      .then((r) => r.sid)
      .then((sid) =>
        axios({
          method: "post",
          url: `https://${process.env.REACT_APP_DEV_API || document.domain}/mercado?sid=${sid}`,
          data: {
            total_price: totalPrice,
            products: products,
          },
        }).then(r=>{console.log(r.data);window.open(r.data, '_blank', "top=200,left=400,width=1000,height=700");})
      );
  }

  return (
    <>
      <input
        type="button"
        value="MPButton"
        onClick={() => {
          findLinkMP();
        }}
      ></input>
    </>
  );
}

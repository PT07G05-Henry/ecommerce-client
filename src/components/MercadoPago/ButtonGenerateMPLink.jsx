import React, {useEffect, useState}from "react";
import "./buttongeneratemplink.css"
import api, { endPoint } from "../../lib/api";
import { getUsersById, selectUserById } from "../../store/userById";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ButtonGenerateMPLink({totalPrice, cart, userId}) {
  const products = cart.map(({name, qty, price, id})=>({id, name, qty, price }));
  const user = useSelector(selectUserById);
  const [direction, setDirection] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUsersById(userId));
  }, [])
  
  useEffect(() => {
    user && user.direction &&
    settingDirection(user)
  }, [user])

  function settingDirection(u){
    const direc = `Direction Address: ${u.direction} - Between street 1: ${u.street1} & street 2: ${u.street2} - City: ${u.city} - Postal Code: ${u.postalCode}`
    console.log(direc)
    setDirection(direc)
  }
  products.forEach(e => {
    e["title"] = e["name"];
    delete e["name"];
    e["quantity"] = Number.parseInt(e["qty"]);
    delete e["qty"]
    e["unit_price"] = Number(e["price"]);
    delete e["price"];
    e["currency_id"] = "ARS"
  });

  function findLinkMP() {
    api.post(endPoint.orders,{data: {total_price: totalPrice,
      products: products}}).then(r=>{window.open(r.data, '_self')})
  }

  if(user && user.direction && user.street1 && user.street2 && user.city && user.postalCode){
    
  }

  return (
    <>
    {user && user.direction && user.street1 && user.street2 && user.city && user.postalCode ? 
    <input
    className="btn cart__btn cart__btn-aprove"
    value="Proceed to checkout"
    type="button"
    onClick={() => {
      findLinkMP();
    }}
  ></input>:
      <input
    className="btn cart__btn"
    value="Update Direction Address"
    type="button"
    onClick={() => {
      navigate("/dashboard");
    }}
    ></input>
    }
      
    </>
  );
}


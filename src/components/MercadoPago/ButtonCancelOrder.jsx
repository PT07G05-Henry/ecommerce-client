import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./buttongeneratemplink.css";
import api, { endPoint } from "../../lib/api";
import { useState } from "react";
import { reset, deleteItem } from "../../store/cart";
import { useDispatch, useSelector } from "react-redux";
import {selectCarts} from "../../store/cart"
import { useEffect } from "react";

export default function ButtonGenerateOrder({userId, setItems}) {
  const carrito = useSelector(selectCarts)
  const dispatch = useDispatch()
  function handler(){
    console.log("userId",userId)
    dispatch(reset())
    setItems([])
    localStorage.setItem(`User${userId}`, JSON.stringify([]))
  }

  return (
    <>
      <input
        className="btn cart__btn cart__btn-cancel"
        value="Cancel Order"
        type="button"
        onClick={() => {
          handler();
        }}
      ></input>
    </>
  );
}

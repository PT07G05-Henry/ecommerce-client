import React from "react";
import "./buttongeneratemplink.css";
import { reset, deleteItem } from "../../store/cart";
import { useDispatch, useSelector } from "react-redux";
import {selectCarts} from "../../store/cart"

export default function ButtonGenerateOrder({userId, setItems}) {
  const carrito = useSelector(selectCarts)
  const dispatch = useDispatch()
  function handler(){
    dispatch(reset())
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

import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./payment.css";
import { useDispatch } from "react-redux";
import { reset } from "../../store/cart";
import api, { endPoint } from "../../lib/api";

export default function Payment() {
    const dispatch = useDispatch();
  const search = useLocation().search;
  const navigate = useNavigate();
  const orderId = new URLSearchParams(search).get("orderId");
  const status = new URLSearchParams(search).get("status");
  const total_price = new URLSearchParams(search).get("total_price");
  const userId = new URLSearchParams(search).get("userId");
  const [onlyOnce, setOnlyOnce] = useState(true);

  useEffect(()=>{
    setOnlyOnce(true)
  },[])
  useEffect(() => {
    onlyOnce &&
    api.delete(endPoint.cart, {data: {userId:userId}})
    setOnlyOnce(false)
  }, [dispatch])
  

  return (
    <div className="container ">
      <table className="container__table">
        <tr>
          <th colSpan={2}>
            <h1>Payment</h1>
          </th>
        </tr>
        <tr>
          <td>Order ID :</td>
          <td>{orderId}</td>
        </tr>
        <tr>
          <td>Status :</td>
          <td>{status}</td>
        </tr>
        <tr>
          <td>Total Price :</td>
          <td>{total_price}</td>
        </tr>
      </table>
      <div className="divCenter">
        <input
            className="btn"
            type="button"
            value="See More Details"
            onClick={() => navigate(`/orDetail/${orderId}`)}
        ></input>
        <input
            className="btn"
            type="button"
            value="Go Home"
            onClick={() => navigate("/")}
        ></input>
        
      </div>
    </div>
  );
}
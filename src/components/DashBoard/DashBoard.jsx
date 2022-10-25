import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Orders from "../Orders/Orders";
import Products from "../Products/Products";
import Users from "../Users/Users";
import "./DashBoard.css";

export default function DashBoard() {
  const [hidden, setHidden] = useState({
    orders: true,
    users: true,
    products: true,
  });
  const navigate = useNavigate()

  function handleClick(e) {
    const value = e.target.value;
    switch (value) {
      case "orders":
        setHidden({ orders: false, users: true, products: true });
        break;
      case "users":
        setHidden({ orders: true, users: false, products: true });
        break;
      case "products":
        setHidden({ orders: true, users: true, products: false });
        break;
      default:
        break;
    }
  }

  function showComponent() {
    if (!hidden.orders) return <Orders />;
    if (!hidden.users) return //<Users />; Componente Users dejo de funcionar por la proteccion de rutas
    if (!hidden.products) return <Products />;
  }

  return (
    <div className="component">
      <div className="options">
        <button value="products" onClick={handleClick}>
          Products
        </button>
        <button value='createProduct' onClick={()=>navigate("/create/product")}>
          Create Product
        </button>
        <button value="users" onClick={handleClick}>
          Users
        </button>
        <button value="orders" onClick={handleClick}>
          Orders
        </button>
      </div>
      <div className="selectedOption">{showComponent()}</div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Orders from "../Orders/Orders";
import Products from "../Products/Products";
import Users from "../Users/Users";
import CreateProduct from "../CreateProduct/CreateProduct";
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
        setHidden({ orders: false, users: true, products: true, createProduct: true });
        break;
      case "users":
        setHidden({ orders: true, users: false, products: true, createProduct: true  });
        break;
      case "products":
        setHidden({ orders: true, users: true, products: false, createProduct: true  });
        break;
      case "createProduct":
        setHidden({ orders: true, users: true, products: true, createProduct: false  });
        break;
      default:
        break;
    }
  }

  function showComponent() {
    if (!hidden.orders) return <Orders />;
    if (!hidden.users) return <Users />; //Componente Users dejo de funcionar por la proteccion de rutas
    if (!hidden.products) return <Products />;
    if (!hidden.createProduct) return <CreateProduct/>
  }

  return (
    <div className="component">
      <div className="options">
        <button value="products" onClick={handleClick}>
          Products
        </button>
        <button value='createProduct' onClick={handleClick}>
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

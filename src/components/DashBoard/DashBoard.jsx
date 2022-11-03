import React, { useState, useEffect } from "react";
import Orders from "../Orders/Orders";
import Products from "../Products/Products";
import Users from "../Users/Users";
import CreateProduct from "../CreateProduct/CreateProduct";
import CreateCategory from "../CreateCategory/CreateCategory";
import { selectThisUserRoles, selectThisUser } from "../../store/thisUser";
import { useSelector } from "react-redux";
import Profile from "../Profile/Profile";
import History from "../History/History";
import "./DashBoard.css";

export default function DashBoard() {
  const [hidden, setHidden] = useState({
    orders: true,
    users: true,
    products: true,
    createProduct: true,
    profile: true,
    history: true,
    default: false,
  });
  const userId = useSelector(selectThisUser);
  const rol = useSelector(selectThisUserRoles);
  const access = () => {
    if (rol.find((e) => e === "Superadmin")) {
      return "Superadmin";
    }
    if (rol.find((e) => e === "Admin")) {
      return "Admin";
    }
    if (rol.find((e) => e === "User")) {
      return "User";
    }
    if (rol.find((e) => e === "Guest")) {
      return "Guest";
    }
  };

  useEffect(() => {}, []);

  function handleClick(e) {
    const value = e.target.value;
    const objHide = {
      orders: true,
      users: true,
      products: true,
      createProduct: true,
      profile: true,
      history: true,
      createCategory: true,
      default: true,
    };
    switch (value) {
      case "orders":
        objHide.orders = false;
        setHidden(objHide);
        break;
      case "users":
        objHide.users = false;
        setHidden(objHide);
        break;
      case "products":
        objHide.products = false;
        setHidden(objHide);
        break;
      case "createProduct":
        objHide.createProduct = false;
        setHidden(objHide);
        break;
      case "profile":
        objHide.profile = false;
        setHidden(objHide);
        break;
      case "history":
        objHide.history = false;
        setHidden(objHide);
        break;
      case "createCategory":
        objHide.createCategory = false;
        setHidden(objHide);
        break;
      default:
        break;
    }
  }

  function showComponent() {
    if (!hidden.default) {
      if (access() === "Superadmin") {
        return <Products rol={access()} adminId={userId.userDb.id} />;
      }
      if (access() === "Admin") {
        return <Products rol={access()} adminId={userId.userDb.id} />;
      }
      if (access() === "User") {
        return (
          <Profile rol={access()} userId={userId.userDb.id} test={"test"} />
        );
      }
    }
    if (!hidden.orders)
      return <Orders rol={access()} adminId={userId.userDb.id} />;
    if (!hidden.users) return <Users />; //Componente Users dejo de funcionar por la proteccion de rutas
    if (!hidden.products)
      return <Products rol={access()} adminId={userId.userDb.id} />;
    if (!hidden.createProduct)
      return <CreateProduct rol={access()} adminId={userId.userDb.id} />;
    if (!hidden.profile)
      return <Profile rol={access()} userId={userId.userDb.id} test={"test"} />;
    if (!hidden.history) return <History />;
    if (!hidden.createCategory) return <CreateCategory />;
  }

  if (access() === "User") {
    return (
      <div className="component">
        <div className="options">
          <button className="btn btn-primary" value="profile" onClick={handleClick}>
            Profile
          </button>
          <button className="btn btn-primary" value="history" onClick={handleClick}>
            History
          </button>
        </div>
        <div className="selectedOption">{showComponent()}</div>
      </div>
    );
  }

  if (access() === "Admin") {
    return (
      <div className="component">
        <div className="options">
          <button className="btn btn-primary" value="profile" onClick={handleClick}>
            Profile
          </button>
          <button className="btn btn-primary" value="products" onClick={handleClick}>
            Products
          </button>
          <button className="btn btn-primary" value="createProduct" onClick={handleClick}>
            Create Product
          </button>
          <button className="btn btn-primary" value="createCategory" onClick={handleClick}>
            Create Category
          </button>
          <button className="btn btn-primary" value="orders" onClick={handleClick}>
            Orders
          </button>
        </div>
        <div className="selectedOption">{showComponent()}</div>
      </div>
    );
  }

  return (
    //Superadmin
    <div className="component">
      <div className="options">
        <button className="btn btn-primary" value="profile" onClick={handleClick}>
          Profile
        </button>
        <button className="btn btn-primary" value="products" onClick={handleClick}>
          Products
        </button>
        <button className="btn btn-primary" value="createProduct" onClick={handleClick}>
          Create Product
        </button>
        <button className="btn btn-primary" value="createCategory" onClick={handleClick}>
          Create Category
        </button>
        <button className="btn btn-primary" value="users" onClick={handleClick}>
          Users
        </button>
        <button className="btn btn-primary" value="orders" onClick={handleClick}>
          Orders
        </button>
      </div>
      <div className="selectedOption">{showComponent()}</div>
    </div>
  );
}

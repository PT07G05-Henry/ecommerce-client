import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import WebFrame from "./containers/webFrame/WebFrame";
import Home from "./containers/Home/Home";
import Catalog from "./containers/catalog/Catalog";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import CreateProduct from "../src/components/CreateProduct/CreateProduct";
import SearchByName from "./containers/SearchByName/SearchByName";
import UpdateProduct from "../src/components/UpdateProduct/UpdateProduct";
import OrderDetail from "../src/components/OrderDetail/OrderDetail";
import DashBoard from "./components/DashBoard/DashBoard";
import Cart from "../src/components/Cart/Cart";
import Orders from "../src/components/Orders/Orders";
import { selectThisUserRoles } from "./store/thisUser";
import { useSelector } from "react-redux";

function App() {
  const navigate = useNavigate();
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
  return (
    <>
      <Routes>
        <Route path="/" element={<WebFrame />}>
          <Route index element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/productsByName/:name" element={<SearchByName />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          {!(access() === ("Guest" || "User")) && (
            <Route path="/create/product" element={<CreateProduct />} />
          )}
          {!(access() === ("Guest" || "User" || "Admin")) && (
            <Route path="/or" element={<Orders />} />
          )}
          {!(access() === ("Guest" || "User" || "Admin")) && (
            <Route path="orDetail/:id" element={<OrderDetail />} />
          )}
          {!(access() === "Admin") && <Route path="/cart" element={<Cart />} />}
          {!(access() === ("Guest" || "User" || "Admin")) && (
            <Route path="/update/product/:id" element={<UpdateProduct />} />
          )}
          {!(access() === "Guest") && (
            <Route path="/dashBoard" element={<DashBoard />} />
          )}
          <Route
            path="*"
            element={
              <section className="container">
                <h1>Is not a valid path!</h1>
                <button
                  className="btn"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Go back to Home!
                </button>
              </section>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import WebFrame from "./containers/webFrame/WebFrame";
import Home from "./containers/Home/Home";
import Catalog from "./containers/catalog/Catalog";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import SearchByName from "./containers/SearchByName/SearchByName";
import UpdateProduct from "../src/components/UpdateProduct/UpdateProduct";
import OrderDetail from "../src/components/OrderDetail/OrderDetail";
import DashBoard from "./components/DashBoard/DashBoard";
import Cart from "../src/components/Cart/Cart";
import Payment from "../src/components/Payment/Payment"
import Redirect from "./components/Redirect/Redirect";
import About from "./components/AboutUs/Aboutus";
import ProtectedFrom from "./components/protectedFrom/ProtectedFrom";
import Profile from "./components/Profile/Profile";
import History from "./components/History/History";
import Products from "./components/Products/Products";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import CreateCategory from "./components/CreateCategory/CreateCategory";
import Orders from "../src/components/Orders/Orders";
import Users from "./components/Users/Users";
import { selectThisUserId } from "./store/thisUser";
import { useSelector } from "react-redux";
import access from "./lib/access";

function App() {
  const userId = useSelector(selectThisUserId);
  return (
    <>
      <Routes>
        <Route path="/" element={<WebFrame />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="productsByName/:name" element={<SearchByName />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="aboutus" element={<About />} />
          <Route path="payment" element={<ProtectedFrom Admin><Payment /></ProtectedFrom>} />
          <Route path="orDetail/:id" element={<ProtectedFrom Guest User Admin><OrderDetail /></ProtectedFrom>} />
          <Route path="cart" element={<ProtectedFrom Admin><Cart /></ProtectedFrom>} />
          <Route path="update/product/:id" element={<ProtectedFrom Guest User Admin><UpdateProduct /></ProtectedFrom>} />
          <Route path="dashBoard" element={<ProtectedFrom Guest><DashBoard /></ProtectedFrom>} >
            <Route index element={<ProtectedFrom Guest ><Profile rol={access()} userId={userId} test={"test"} /></ProtectedFrom>} />
            <Route path="history" element={<ProtectedFrom Guest Admin Superadmin><History /></ProtectedFrom>} />
            <Route path="products" element={<ProtectedFrom Guest User>{access() === "User" ? <Profile rol={access()} userId={userId} test={"test"} /> : <Products rol={access()} adminId={userId} />}</ProtectedFrom>} />
            <Route path="createProduct" element={<ProtectedFrom Guest User><CreateProduct rol={access()} adminId={userId} /></ProtectedFrom>} />
            <Route path="createCategory" element={<ProtectedFrom Guest User><CreateCategory /></ProtectedFrom>} />
            <Route path="orders" element={<ProtectedFrom Guest User> <Orders rol={access()} adminId={userId} /></ProtectedFrom>} />
            <Route path="users" element={<ProtectedFrom Guest User Admin><Users /></ProtectedFrom>} />
          </Route>
          <Route path="*" element={<Redirect />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

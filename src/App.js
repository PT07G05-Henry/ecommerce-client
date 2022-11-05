import React, { useEffect } from "react";
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
import Payment from "../src/components/Payment/Payment";
import { selectThisUserRoles, selectThisUser } from "./store/thisUser";
import { useDispatch, useSelector } from "react-redux";
import Redirect from "./components/Redirect/Redirect";
import About from "./components/AboutUs/Aboutus";
import api, { endPoint } from "./lib/api";
import { selectCarts, dataBaseValue } from "./store/cart";

function App() {
  const navigate = useNavigate();
  const cart = useSelector(selectCarts);
  const rol = useSelector(selectThisUserRoles);
  const user = useSelector(selectThisUser);
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (rol[0] === "User") {
      cart.length > 0
        ? api
            .post(endPoint.cart, {
              data: { userId: user.userDb.id, products: cart },
            })
            .then((r) => {
            if(!areEqual(cart,r.data.items)){
              //hacer dispatch a cart con los valores de la Data Base
              dispatch(dataBaseValue(r.data.items))
            }

            }
            )
        : api.post(endPoint.cart, { data: { userId: user.userDb.id } }).then((r) => {
          if(!areEqual(cart,r.data.items)){
            //hacer dispatch a cart con los valores de la Data Base
            dispatch(dataBaseValue(r.data.items))
          }
          });
      return;
    }
  }, [rol]);

  useEffect(()=>{
    if (rol[0] === "User") {
      if(cart.length > 0){
        api.post(endPoint.cart, {data: { userId: user.userDb.id } }).then((r)=>{
          if(!areEqual(cart,r.data.items))
          return api.put(endPoint.cart, {data: {userId:user.userDb.id, products:cart}}).then(t=>console.log(t))
        })
      }else{
        api.delete(endPoint.cart, {data: {userId: user.userDb.id}})
      }
    }
  },[cart])

  function areEqual(array1, array2) {
    if (array1.length === array2.length) {
      return array1.every((element, index) => {
        if (element === array2[index]) {
          return true;
        }
        return false;
      });
    }
    return false;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<WebFrame />}>
          <Route index element={<Home />} />
          {!(access() === "Admin") && (
            <Route path="/payment" element={<Payment />} />
          )}
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/productsByName/:name" element={<SearchByName />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/aboutus" element={<About />} />
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
          <Route path="*" element={<Redirect />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

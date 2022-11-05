import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import WebFrame from "./containers/webFrame/WebFrame";
import Home from "./containers/Home/Home";
import Catalog from "./containers/catalog/Catalog";
import ProductDetail from "./components/ProductDetail/ProductDetail";
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

import ProtectedFrom from "./components/protectedFrom/ProtectedFrom";
import Profile from "./components/Profile/Profile";
import History from "./components/History/History";
import Products from "./components/Products/Products";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import CreateCategory from "./components/CreateCategory/CreateCategory";
import Users from "./components/Users/Users";
import { selectThisUserId } from "./store/thisUser";
import access from "./lib/access";
function App() {
  // const navigate = useNavigate();
  const userId = useSelector(selectThisUserId);
  const cart = useSelector(selectCarts);
  const rol = useSelector(selectThisUserRoles);
  const user = useSelector(selectThisUser);
  const dispatch = useDispatch();

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

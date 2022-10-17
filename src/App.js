import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Footer from "./components/Footer/Footer";
import CreateProduct from "../src/components/CreateProduct/CreateProduct";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products/:id" element={<ProductDetail />} />
        <Route exact path="/createProduct" element={<CreateProduct />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

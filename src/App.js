import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Welcome from "./containers/welcome/Welcome";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;

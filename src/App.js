import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import Welcome from "./containers/welcome/Welcome";
import ProductDetail from "./components/ProductDetail/ProductDetail";


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route exact path="/products/:id" element={<ProductDetail />} />
      </Routes>
     <Footer />
    </>
  );
}

export default App;

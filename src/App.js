import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import WebFrame from "./containers/webFrame/WebFrame";
import Home from "./containers/Home/Home";
import Catalog from "./containers/catalog/Catalog";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import CreateProduct from "../src/components/CreateProduct/CreateProduct";
import SearchByName from "./containers/SearchByName/SearchByName";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path="/" element={<WebFrame />}>
          <Route index element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/productsByName/:name" element={<SearchByName />} />
          <Route path="/create/product" element={<CreateProduct />} />
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

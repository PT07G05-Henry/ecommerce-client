import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./searchBar.css";

export default function SearchBar() {
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const [show, setShow] = useState(false);
  function handleSubmit(e) {
    setProduct(e.target.value);
  }
  
  return (
    <>
      <div className="searchBar__container">
        <div className="container searchBar__flex">
          <div className="searchBar__buttonPlace">
            
            {window.location.href === 'https://localhost:3000/' ? null : <div
              className="btn-rounded searchBar__button searchBar__backButton"
              onClick={() => {
                window.history.back();
              }}
            >
              <MdArrowBackIosNew size={24} />
            </div> }
          </div>
          <div className="searchBar__buttonPlace">
            <form
              style={!show ? { display: "none" } : undefined}
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/productsByName/${product}`);
                setProduct("");
              }}
              className="box searchBar"
            >
              <input
                className="searchBar-textInput"
                type="text"
                value={product}
                onChange={handleSubmit}
                placeholder="Search products..."
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
            <div
              className="btn-rounded searchBar__button"
              onClick={() => {
                setShow(!show);
              }}
            >
              <GoSearch size={24} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

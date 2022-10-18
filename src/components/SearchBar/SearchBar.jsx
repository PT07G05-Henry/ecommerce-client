import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import "./searchBar.css";

export default function SearchBar() {
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  function handleSubmit(e) {
    setProduct(e.target.value);
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/products/${product}`);
        setProduct("");
      }}
      className="nav__searchBar"
    >
      <input
        className="nav__searchBar-textInput"
        type="text"
        value={product}
        onChange={handleSubmit}
        placeholder="Search products..."
      />
      <button type="submit" className="btn btn-primary">
        <GoSearch />
      </button>
    </form>
  );
}

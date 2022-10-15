import React from "react";
import "./searchBar.css";

export default function SearchBar() {
  return (
    <form className="nav__searchBar">
      <input
        className="inputProductos"
        type="text"
        placeholder="Colocar producto..."
      />
      <input className="inputButton" type="submit" value="" />
    </form>
  );
}

import React from "react";
import { GoSearch } from "react-icons/go"
import "./searchBar.css";

export default function SearchBar() {
  return (
    <form className="nav__searchBar">
      <input
        className="nav__searchBar-textInput"
        type="text"
        placeholder="Buscar productos..."
      />
      <button type="submit" className="btn btn-primary"><GoSearch/></button>
    </form>
  );
}

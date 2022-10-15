import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";


export default function NavBar() {
 
  return (
    <div className='navBarConteiner'>
      <div className='conteinerMerch'> 
      </div>
      <div className='navContent'>
      <Link className='navLink' to='/home'>HOME</Link>
      <Link className='navLink' to='/products'>CART</Link>
      <Link className='navLink' to='/account'>ACCOUNT</Link>
      <SearchBar className='navSearchBar'/>
    </div>
      </div>
  );
}
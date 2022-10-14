import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";


export default function NavBar() {
 
  return (
    <div className='navBarConteiner'>
      <div className='conteinerMerch'> 
      </div>
      <div className='navContent'>
      <Link className='navLink' to='/home'>INICIO</Link>
      <Link className='navLink' to='/productos'>CATALOGO</Link>
      <Link className='navLink' to='/cuenta'>CUENTA</Link>
      <SearchBar className='navSearchBar'/>
    </div>
      </div>
  );
}
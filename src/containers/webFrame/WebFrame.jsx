import React from "react";
import "./webFrame.css"
import Background from "../../components/background/Background";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

const WebFrame = () => {
  return (
    <>
      <Background/>
      <div className="webFrame__topSpace"/>
      <Outlet />
      <NavBar />
      <SearchBar/>
      <Footer />
    </>
  );
};

export default WebFrame;

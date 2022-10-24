import React from "react";
import "./webFrame.css";
import Background from "../../components/background/Background";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import LOGO from "../../assets/Logo.svg";
import { useNavigate } from "react-router-dom";

const WebFrame = () => {
  const navigate = useNavigate()
  return (
    <>
      <Background />
      <div className="webFrame__topSpace">
        <div className="brand" onClick={()=>{navigate("/")}}>
          <div className="logo">
            <img src={LOGO} alt="logo" />
          </div>
          <p className="name">TECNOMERCH</p>
          <p className="slogan">The future is here</p>
        </div>
      </div>
      <Outlet />
      <Footer />
      <NavBar />
      <SearchBar />
    </>
  );
};

export default WebFrame;

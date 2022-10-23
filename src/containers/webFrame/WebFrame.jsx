import React from "react";
import Background from "../../components/background/Background";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const WebFrame = () => {
  return (
    <>
      <Background/>
      <Outlet />
      <NavBar />
      <Footer />
    </>
  );
};

export default WebFrame;

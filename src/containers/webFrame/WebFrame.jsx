import React, { useEffect, useState } from "react";
import "./webFrame.css";
import Background from "../../components/background/Background";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import LOGO from "../../assets/Logo.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectWindowSize, setWindowSize } from "../../store/window";

const WebFrame = () => {
  const dispatch = useDispatch();
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { width: innerWidth, height: innerHeight };
  };
  const windowSize = useSelector(selectWindowSize);
  useEffect(() => {
    const handleWindowResize = () => {
      dispatch(setWindowSize(getWindowSize()));
    };
    dispatch(setWindowSize(getWindowSize()));
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Background />
      <div className="webFrame__topSpace">
        <div
          className="brand"
          onClick={() => {
            navigate("/");
          }}
        >
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

import React from "react";
import LOGO from "../../assets/Logo-Mitad.svg";
import TEXTURE from "../../assets/Circuit.svg";
import "./background.css";

const Background = () => {
  return (
    <>
      <div className="background__texture">
        <img src={TEXTURE} alt="half logo" />
      </div>
      <div className="background__filter1" />
      <div className="background">
        <div className="background__logo">
          <img src={LOGO} alt="half logo" className="background__logo" />
        </div>
      </div>
      <div className="background__filter2" />
    </>
  );
};

export default Background;

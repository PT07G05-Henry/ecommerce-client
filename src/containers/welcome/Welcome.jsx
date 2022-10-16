import React from "react";
import Button from "../../components/button/Button";
import "./welcome.css";

const Welcome = () => {
  return (
    <section className="container welcome__container">
      <h1 className="title">Welcome!</h1>
      <div className="spacer" />
      <Button
        onClick={() => {
          alert("Boom!");
        }}
      >
        {" "}
        Press me!{" "}
      </Button>
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
      <div className="spacer" />
    </section>
  );
};

export default Welcome;

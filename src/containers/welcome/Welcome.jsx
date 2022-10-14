import React from "react";
import Button from "../../components/button/Button";
import "./welcome.css";

const Welcome = () => {
  return (
    <>
      <h1 className="title">Wellcome!</h1>
      <div className="spacer" />
      <Button
        onClick={() => {
          alert("Boom!");
        }}
      >
        {" "}
        Press me!{" "}
      </Button>
    </>
  );
};

export default Welcome;

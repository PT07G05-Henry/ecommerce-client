import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  });
  return (
    <section className="container" style={{ minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>
        Is not a valid path! Redirecting to home...
      </h1>
      <Loading />
    </section>
  );
};

export default Redirect;

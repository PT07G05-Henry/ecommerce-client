import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from '../loading/Loading'
const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  });
  return (
    <section className="title">
      <h1>Is not a valid path!</h1>
      <Loading />
    </section>
  );
};

export default Redirect;

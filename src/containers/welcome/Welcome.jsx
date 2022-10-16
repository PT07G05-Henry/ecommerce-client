import React from "react";
import Button from "../../components/button/Button";
import "./welcome.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getProductById, selectProduct } from "../../store/api";

const Welcome = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  return (
    <section className="container welcome__container">
      <h1 className="title">Welcome!</h1>
      <div className="spacer" />
      <Button
        onClick={() => {
          dispatch(getProducts());
        }}
      >
        {" "}
        Get Products{" "}
      </Button>
      <div className="spacer" />
      <Button
        onClick={() => {
          dispatch(getProductById(2));
        }}
      >
        {" "}
        Get Product{" "}
      </Button>
      <div className="spacer" />
      <h2> {product.name || "Sin cargar aun"} </h2>
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

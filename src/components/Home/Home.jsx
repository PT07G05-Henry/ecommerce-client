import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, selectProducts } from "../../store/api";
import { useEffect } from "react";
import Cards from "../../components/Cards/Cards";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const product = products.slice(0, 9);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div className="homeContainer">
      <div className="navBar">
        <Cards products={product} />
      </div>
    </div>
  );
}

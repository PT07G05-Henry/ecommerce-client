import React, { useEffect } from "react";
import Cards from "../../components/Cards/Cards";
import "./catalog.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, selectProducts } from "../../store/api";
import Loading from "../../components/loading/Loading";

const Catalog = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  useEffect(() => {
    products &&
      (products.toBeField || products.error) &&
      dispatch(getProducts());
  }, [products]);
  console.log(products);
  return (
    <section className="container catalog__container">
      {products.results ? <Cards products={products} /> : <Loading />}
    </section>
  );
};

export default Catalog;

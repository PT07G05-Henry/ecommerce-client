import React, { useEffect } from "react";
import Cards from "../../components/Cards/Cards";
import "./catalog.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, selectProducts, CATEGORY, PAGE } from "../../store/api";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";

const Catalog = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const {categoryId} = useParams();

  useEffect(() => {  
    products &&
    (products.toBeField || products.error) &&
    dispatch(getProducts(categoryId && {[CATEGORY]:categoryId, [PAGE]:"1" }));
  }, [products]);  

  if(categoryId){
    return (
      <section className="container catalog__container">
        {products.results ? (
          <Cards
            products={products}
            dispatch={(flags) => {
              dispatch(getProducts(flags));
            }}
          />
        ) : (
          <Loading />
        )}
      </section>
    );
  }
  return (
    <section className="container catalog__container">
      {products.results ? (
        <Cards
          products={products}
          dispatch={(flags) => {
            dispatch(getProducts(flags));
          }}
        />
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default Catalog;

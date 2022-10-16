import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, selectProduct } from "../../store/api";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch]);

  return (
    <section>
      <img
        src={product.images.filter((e) => e !== null)[0]}
        alt={product.name}
      />
      <h2>{product.name}</h2>
      <h3>{product.price}</h3>
      <h3>stock: {product.stock}</h3>
      <button> Add to cart </button>
      <h4>Description</h4>
      <p>{product.description}</p>
    </section>
  );
};

export default ProductDetail;

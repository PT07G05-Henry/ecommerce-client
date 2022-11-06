import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, selectProducts } from "../../store/api";
import { useNavigate } from "react-router-dom";
import Paginated from "../Paginated/Paginated.jsx";
import api from "../../lib/api";
import Loading from "../loading/Loading";
import "./products.css";

export default function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const handleDelete = async function (e) {
    const id = e.target.value;
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete("products", {
          params: { id: id },
        });
        alert("Product deleted successfully");
        setTimeout((flags) => {
          dispatch(getProducts(flags));
        }, 1000);
      } catch (e) {
        alert("Error " + e.message);
      }
    }
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return products.results ? (
    <>
      <Paginated
        data={products}
        dispatch={(flags) => {
          dispatch(getProducts(flags));
        }}
      />
      <ul className="products__list">
        {products.results.map(({ id, name, price, stock }) => (
          <li key={`Product_${id}`} className="products__list-item">
            <button
              className="btn"
              onClick={() => {
                navigate(`/update/product/${id}`);
              }}
            >
              Update
            </button>
            <p>{`Stock: ${stock}`}</p>
            <p>{`Price: $${price}`}</p>
            <p>{`Name: ${name}`}</p>
            <p>{`ID: ${id}`}</p>
          </li>
        ))}
      </ul>
    </>
  ) : (
    <Loading />
  );
}

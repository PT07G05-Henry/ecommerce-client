import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsByName,
  selectProductsByName,
} from "../../store/productsByName";
import { NAME } from "../../store/api";
import { useNavigate } from "react-router-dom";
import Paginated from "../Paginated/Paginated.jsx";
import api from "../../lib/api";
import Loading from "../loading/Loading";
import "./products.css";

export default function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectProductsByName);
  const [name, setName] = useState("");

  const handleDelete = async function (e) {
    const id = e.target.value;
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete("products", {
          params: { id: id },
        });
        alert("Product deleted successfully");
        setTimeout(() => {
          dispatch(getProductsByName());
        }, 1000);
      } catch (e) {
        alert("Error " + e.message);
      }
    }
  };

  useEffect(() => {
    dispatch(getProductsByName());
  }, [dispatch]);

  return products.results ? (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          name !== "" && dispatch(getProductsByName({ [NAME]: name }));
          setName("");
        }}
        className="products__searchByName"
      >
        <div className="products__searchByName-search">
          <input
            value={name}
            onChange={({ target }) => {
              setName(target.value);
            }}
            type="text"
            className="products__searchByName"
            placeholder="Filter by name"
          />
          <button type="submit" className="btn">
            Search
          </button>
        </div>
        {products.query.name && (
          <div className="products__searchByName-active">
            <label>{`Filtering by "${products.query.name}" on name`}</label>
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch(getProductsByName());
              }}
            >
              Back to view all
            </button>
          </div>
        )}
      </form>
      {products.results.length ? (
        <>
          <Paginated
            data={products}
            dispatch={(flags) => {
              dispatch(getProductsByName(flags));
            }}
          />
          <ul className="products__list">
            {products.results.map(({ id, name, price, stock }) => (
              <li key={`Product_${id}`} className="products__list-item">
                <button className="btn btn-warning" onClick={handleDelete}>
                  Delete
                </button>
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
        <h1
          style={{ textAlign: "center" }}
        >{`No products found`}</h1>
      )}
    </>
  ) : (
    <Loading />
  );
}

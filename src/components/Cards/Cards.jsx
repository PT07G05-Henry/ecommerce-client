import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import {
  PAGE,
  QUANTITY,
  CATEGORY,
  TYPE_ORDER,
  ASC,
  DESC,
  ORDERBY,
} from "../../store/api";
import "./cards.css";

const Cards = ({ products, dispatch }) => {
  const [controller, setController] = useState(products.query);
  const [change, setChange] = useState(false);
  let buttons = [];
  const removeOfController = (flag) => {
    let newController = controller;
    delete controller[flag];
    setController(newController);
    setChange(!change);
  };
  const addToController = (flag) => {
    setController({ ...controller, ...flag });
    setChange(!change);
  };
  for (let i = 10; i <= products.totalPage; i += 10)
    buttons.push(
      <button
        className="btn"
        onClick={() => {
          const flag = { [PAGE]: i.toString() };
          addToController(flag);
        }}
      >
        {" "}
        {i}{" "}
      </button>
    );
  useEffect(() => {
    change && dispatch(controller);
  }, [controller]);
  return (
    <>
      <p className="btn">page: {products.page}</p>
      <div className="cards__controller">
        <div className="cards__controller-filters">
          
        </div>
        <div className="cards__controller-pager">
          <button
            className="btn"
            onClick={() => {
              dispatch(products.prev);
            }}
            style={!products.prev ? { display: "none" } : undefined}
          >
            {"<"}
          </button>
          {buttons}
          <button
            className="btn"
            onClick={() => {
              dispatch(products.next);
            }}
            style={!products.next ? { display: "none" } : undefined}
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="cards__grid">
        {products.results?.map((el) => (
          <Card
            key={`product_${el.id}`}
            id={el.id}
            images={el.images}
            name={el.name}
            price={el.price}
          />
        ))}
      </div>
    </>
  );
};

export default Cards;

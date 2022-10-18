import React from "react";
import Card from "../Card/Card";
import "./cards.css";

const Cards = ({ products }) => {
  return (
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
  );
};

export default Cards;

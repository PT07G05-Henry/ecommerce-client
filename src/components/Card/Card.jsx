import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, images, name, price }) => {
  const navigate = useNavigate();
  return (
    <article onClick={() => navigate(`/products/${id}`)}>
      <img src={images.filter((e) => e !== null)[0]} alt={name} />
      <h3>{name}</h3>
      <h3>{price}</h3>
      <button onClick={() => {}}>Add to cart</button>
    </article>
  );
};

export default Card;

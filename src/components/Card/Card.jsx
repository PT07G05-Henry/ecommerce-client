import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, images, name, price }) => {
  return (
    <Link to={`/product/${id}`}>
    <article>
      <img src={images.filter((e) => e !== null)[0]} alt={name} />
      <h3>{name}</h3>
      <h3>{price}</h3>
      <button onClick={() => {}}>Add to cart</button>
    </article>
    </Link>
  )
};

export default Card;

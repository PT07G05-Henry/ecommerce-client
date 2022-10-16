import React from "react";

const Card = ({ images, name, price }) => {
  return (
    <>
      <img src={images.filter((e) => e !== null)[0]} alt={name} />
      <h3>{name}</h3>
      <h3>{price}</h3>
      <button onClick={() => {}}>Add to cart</button>
    </>
  )
};

export default Card;

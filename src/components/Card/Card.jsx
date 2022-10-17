import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, images, name, price }) => {
  const navigate = useNavigate();
  const [imgIndex, setImgIndex] = useState(0);
  const image = images
    ?.filter((e) => e.image !== null)
    .map((e) => <img src={e.image} alt="image" />);
  //const image = images.filter((e) => e.image !== null)
  console.log(images)
  return (
    <article onClick={() => navigate(`/products/${id}`)}>
      {image && image.length && (
        <div className="card__imageViewer">
          <button
            className="card__imageViewer-arrow"
            style={imgIndex === 0 ? { display: "none" } : {}}
            onClick={() => setImgIndex(imgIndex - 1)}
          >
            {"<"}
          </button>
          {image[imgIndex]}
          <button
            className="card__imageViewer-arrow"
            style={imgIndex === image.length - 1 ? { display: "none" } : {}}
            onClick={() => setImgIndex(imgIndex + 1)}
          >
            {">"}
          </button>
        </div>
      )}
      <h3>{name}</h3>
      <h3>${price}</h3>
      <button onClick={() => {}}>Add to cart</button>
    </article>
  );
};

export default Card;

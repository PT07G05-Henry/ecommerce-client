import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./card.css";

const Card = ({ id, images, name, price }) => {
  const navigate = useNavigate();
  const [imgIndex, setImgIndex] = useState(0);
  const image = images
    ?.filter((e) => e.image !== null)
    .map((e) => <img src={e.image} alt="image" />);
  return (
    <article className="card">
      {image && image.length && (
        <>
          <div className="card__imageViewer">
            {image[imgIndex]}
            <div className="card__imageViewer-controller">
              <button
                className="btn btn-primary card__imageViewer-arrow"
                style={
                  imgIndex === 0
                    ? { display: "none", width: "100%" }
                    : { width: "100%" }
                }
                onClick={() => setImgIndex(imgIndex - 1)}
              >
                {"<"}
              </button>
              <button
                className="btn btn-primary card__imageViewer-arrow"
                style={
                  imgIndex === image.length - 1
                    ? { display: "none", width: "100%" }
                    : { width: "100%" }
                }
                onClick={() => setImgIndex(imgIndex + 1)}
              >
                {">"}
              </button>
            </div>
          </div>
        </>
      )}
      <Link to={`/products/${id}`}>
        <h3>{name}</h3>
      </Link>
      <h3>${price}</h3>
      <button className="btn" onClick={() => {}}>
        Add to cart
      </button>
    </article>
  );
};

export default Card;

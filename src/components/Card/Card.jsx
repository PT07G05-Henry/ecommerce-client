import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./card.css";
import {setItem} from "../../store/cart"

const Card = ({
  id,
  images,
  name,
  price,
  description,
  stock,
  categoriesId,
  categoriesName,
  isCreated = false,
  handleDelete,
}) => {
  const [imgIndex, setImgIndex] = useState(0);
  const dispatch = useDispatch();
  const image = images
    ?.filter((e) => e.image !== null)
    .map((e) => <img src={e.image} alt="image" />);
    function addToChart(){
      dispatch(setItem({id, images, name,price,description,stock,categoriesId,categoriesName, qty:1}))
    }
  return (
    <article className="box card">
      {false && //negué la condición para desaparece el slider de imágenes
        image &&
        image.length && (
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
      <div className="card__imageViewer">{image[0]}</div>
      {!isCreated && (
        <Link to={`/products/${id}`}>
          <h3>{name}</h3>
        </Link>
      )}
      {isCreated && <h3>{name}</h3>}
      <h3>
        {isCreated && "Price: "}${price}
      </h3>
      {isCreated && <h3>Stock: {stock}</h3>}
      {isCreated &&
        categoriesName.length > 0 &&
        categoriesName.map((e) => {
          return (
            <button
              className="btn"
              value={e}
              onClick={(e) => {
                handleDelete(e);
              }}
            >
              {e}
            </button>
          );
        })}
      {isCreated && <p>Description: {description}</p>}
      <button className="btn" onClick={() => {addToChart(id)}}>
        Add to cart
      </button>
    </article>
  );
};

export default Card;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {selectCarts} from "../../store/cart"
import { useNavigate, Link } from "react-router-dom";
import "./card.css";
import {setItem, deleteItem} from "../../store/cart"

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
  const cart = useSelector(selectCarts)
  const image = images
    ?.filter((e) => e.image !== null)
    .map((e) => <img src={e.image} alt="image" />);
  
  useEffect(()=>{
  },[cart])

  function handlerButtonCart(e){
    if(e.target.value === "Add to cart"){
      return addToChart()
    }
    if(e.target.value === "Remove from cart"){
      return removeFromChart()
    }
  }

  function addToChart(){
    dispatch(setItem({id, images, name,price,description,stock,categoriesId,categoriesName, qty:1}))
  }
  
  function removeFromChart(){
    dispatch(deleteItem({id}))
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
      <input type="button" className={cart.findIndex((i)=>i.id === id) !== -1 ? "btn-remove" : "btn"} value={cart.findIndex((i)=>i.id === id) !== -1 ? "Remove from cart" : "Add to cart"} onClick={(e) => {handlerButtonCart(e)}}>
      </input>
    </article>
  );
};

export default Card;

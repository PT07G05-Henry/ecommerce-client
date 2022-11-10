import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCarts } from "../../store/cart";
import { useNavigate } from "react-router-dom";
import "./card.css";
import { setItem, deleteItem } from "../../store/cart";
import {
  selectActiveCard,
  activeCard,
  desactiveCard,
} from "../../store/window";

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
  rol,
}) => {
  const navigate = useNavigate();
  const [imgIndex, setImgIndex] = useState(0);
  const [cartModifier, setCartModifier] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector(selectCarts);
  const qtyInCart = cart.find((item) => item.id === id)?.qty || 0;
  const active = useSelector(selectActiveCard);

  useEffect(() => {
    active === id
      ? setCartModifier("card__cartModifier-active")
      : cartModifier.length &&
        (() => {
          setCartModifier("card__cartModifier-inactive");
          setTimeout(() => {
            setCartModifier("");
          }, 1000);
        })();
  }, [active]);

  const image = images
    ?.filter((e) => e.image !== null)
    .map((e) => <img src={e.image} alt="image" />);

  useEffect(() => {}, [cart]);

  function handlerButtonCart(e) {
    if (e.target.value === "Add to cart") {
      return addToChart();
    }
    if (e.target.value === "Remove from cart") {
      return removeFromChart();
    }
  }

  function addToChart(qty) {
    dispatch(
      setItem({
        id,
        images,
        name,
        price,
        description,
        stock,
        categoriesId,
        categoriesName,
        qty: qty,
      })
    );
  }

  function removeFromChart() {
    dispatch(deleteItem({ id }));
  }

  return (
    <article className="box card">
      <div className="card__static">
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
          <h3
            onClick={() => {
              navigate(`/products/${id}`);
            }}
          >
            {name}
          </h3>
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

        <input
          type="button"
          className={
            cart.findIndex((i) => i.id === id) !== -1
              ? "btn btn-attention"
              : "btn"
          }
          value={
            rol[0] !== "Admin"
              ? cart.findIndex((i) => i.id === id) !== -1
                ? "Modify Cart"
                : "Add to cart"
              : "Disabled for Admin"
          }
          onClick={() => {
            rol[0] !== "Admin" && dispatch(activeCard(id));
          }}
          disabled={rol[0] === "Admin" ? true : false}
        ></input>
      </div>
      <div className={`card__cartModifier ${cartModifier}`}>
        <input
          type="number"
          value={qtyInCart}
          onChange={(e) => {
            e.target.value <= stock &&
              (e.target.value > 0
                ? addToChart(e.target.value)
                : removeFromChart());
          }}
          style={{ padding: ".25rem .5rem", margin: ".5rem" }}
        />
        <p>
          {Boolean(qtyInCart)
            ? `Subtotal: $${(price * qtyInCart).toFixed(2)}`
            : "Not in Cart"}
        </p>
        <div>
          {Boolean(qtyInCart) && (
            <button
              className="btn btn-warning"
              onClick={() => {
                removeFromChart();
                dispatch(desactiveCard());
              }}
              style={{ margin: ".5rem" }}
            >
              Remove
            </button>
          )}
          <button
            className="btn"
            onClick={() => {
              dispatch(desactiveCard());
            }}
            style={{ margin: ".5rem" }}
          >
            Close
          </button>
        </div>
      </div>
    </article>
  );
};

export default Card;

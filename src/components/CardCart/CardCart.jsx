import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./cardcart.css";
import { deleteItem, updateItemQty } from "../../store/cart";
import { useEffect } from "react";

export default function CardCart({
  id,
  images,
  name,
  price,
  description,
  stock,
  categoriesId,
  categoriesName,
  isCreated,
  handleDelete,
  remove,
  qty,
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const [unitsToBuy, setUnitsToBuy] = useState(1);
  const dispatch = useDispatch();
  const image = images
    ?.filter((e) => e.image !== null)
    .map((e) => <img className="imgCart" src={e.image} alt="image" />);

  useEffect(() => {}, [unitsToBuy]);

  function handlerUnitsToBuy(e) {
    var value = e.target.value;
    if (value > stock) {
      value = stock;
    }
    if (value < 1) {
      value = 1;
    }
    setUnitsToBuy(value);
    dispatch(updateItemQty({ id: id, qty: value }));
  }

  function removeProduct() {
    dispatch(deleteItem({ id: id }));
  }

  return (
    <div className="box-dry cartItem__box-dry">
      <div className="cart__item">
        <div className="cart__item-img">
          <div className="cart__imageViewer-controller">
            <button
              className="btn-rounded cart__imageViewer-arrowBack"
              style={imgIndex === 0 ? { display: "none" } : undefined}
              onClick={() => setImgIndex(imgIndex - 1)}
            >
              {"<"}
            </button>
          </div>

          {image[imgIndex]}

          <div className="cart__imageViewer-controller">
            <button
              className="btn-rounded cart__imageViewer-arrowNext"
              style={
                imgIndex === image.length - 1 ? { display: "none" } : undefined
              }
              onClick={() => setImgIndex(imgIndex + 1)}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* <div className="card__imageViewer">{image[0]}</div> */}
        <div className="cart__item-info">
          {!isCreated && (
            <Link to={`/products/${id}`}>
              <h3>{name}</h3>
            </Link>
          )}
          {isCreated && <h2>{name}</h2>}
          <h3>
            {isCreated && "Price: "}${price}
          </h3>
          {isCreated && (
            <h3>
              Units to buy:{" "}
              <input
                type="number"
                value={qty}
                min={1}
                max={stock}
                onChange={(e) => {
                  handlerUnitsToBuy(e);
                }}
              ></input>
            </h3>
          )}
          {isCreated &&
            categoriesName?.length > 0 &&
            categoriesName?.map((e) => {
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
          {isCreated && (
            <input
              type="button"
              className="removeProduct"
              onClick={() => {
                removeProduct();
              }}
              value={"Remove this product"}
            ></input>
          )}
        </div>
      </div>

    </div>
  );
}

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./cardcart.css";
import { deleteItem , updateItemQty} from "../../store/cart";
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
  qty
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const [unitsToBuy, setUnitsToBuy] = useState(1);
  const dispatch = useDispatch();
  const image = images
    ?.filter((e) => e.image !== null)
    .map((e) => <img className="imgCart" src={e.image} alt="image" />);

  useEffect(() => {
  }, [unitsToBuy]);

  function handlerUnitsToBuy(e) {
    var value = e.target.value;
    if (value > stock) {
      value = stock;
    }
    if (value < 1) {
      value = 1;
    }
    setUnitsToBuy(value);
    dispatch(updateItemQty({id:id, qty:value}))
  }

  function removeProduct() {
    dispatch(deleteItem({ id: id }));
  }

  return (
    <div className="ContainerArticule">
      <div className="ArticuleInfo">
        <div className="divImage">
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
          </div>
          {image[imgIndex]}
          <div className="card__imageViewer-controller">
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
        {/* <div className="card__imageViewer">{image[0]}</div> */}
        <div className="dataInfo">
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
      <div className="divDescription">
        {isCreated && <p>Description: {description}</p>}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, selectProductsById } from "../../store/productById";
import { selectCarts } from "../../store/cart";
import { useParams } from "react-router-dom";
import { setItem, deleteItem } from "../../store/cart";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const cart = useSelector(selectCarts);
  const dispatch = useDispatch();
  const product = useSelector(selectProductsById);
  const [imgIndex, setImgIndex] = useState(0);

  const image = product.images
    ?.filter((e) => e.image !== null)
    .map((e) => <img src={e.image} alt="image" />);

  useEffect(() => {
    (product.noProduct || product.error || product.id !== id) &&
      dispatch(getProductById(id));
  }, [id]);

  useEffect(() => {}, [cart]);

  const ratingArray = () => {
    if (product.rating === 0) {
      return [];
    }
    let arrayFill = [];
    for (let i = 0; i < product.rating; i++) {
      arrayFill.push(i + 1);
    }
    return arrayFill;
  };

  const ratingArrayEmpty = () => {
    if (product.rating === 0) {
      return [0];
    }
    if (product.rating === 5) {
      return [];
    }
    let arrayEmpty = []; //3 -> 2
    for (let i = 0; i < 5 - product.rating; i++) {
      arrayEmpty.push(i + 1);
    }
    return arrayEmpty;
  };

  function handlerButtonCart(e) {
    if (e.target.value === "Add to cart") {
      return addToChart();
    }
    if (e.target.value === "Remove from cart") {
      return removeFromChart();
    }
  }

  function addToChart() {
    dispatch(
      setItem({
        id: product.id,
        images: product.images,
        name: product.name,
        price: product.price,
        description: product.description,
        stock: product.stock,
        qty: 1,
      })
    );
  }

  function removeFromChart() {
    dispatch(deleteItem({ id: product.id }));
  }

  return (
    <section className="container productDetail">
      <div className="box-dry productDetail__box">
        {image && image.length && (
          <div className="productDetail__img-place">
            <div className="productDetail__button">
              <button
                className="btn-rounded productDetail__img-arrow productDetail__img-arrowBack "
                style={imgIndex === 0 ? { display: "none" } : {}}
                onClick={() => setImgIndex(imgIndex - 1)}
              >
                {"<"}
              </button>
            </div>
            <div className="productDetail_img">{image[imgIndex]}</div>
            <div className="productDetail__button">
              <button
                className="btn-rounded productDetail__img-arrow productDetail__img-arrowNext"
                style={imgIndex === image.length - 1 ? { display: "none" } : {}}
                onClick={() => setImgIndex(imgIndex + 1)}
              >
                {">"}
              </button>
            </div>
          </div>
        )}
        <h1>{product.name}</h1>
        <div className="productDetail__info">
          <h3>{`Price: ${product.price}`}</h3>
          <h3>{`Stock: ${product.stock}`}</h3>
          <div>
          <h3>Rating</h3>
          {ratingArray().length > 0 &&
            ratingArray().map((r) => {
              return <AiFillStar />;
            })}
          {ratingArrayEmpty().length > 0 &&
            ratingArrayEmpty().map((r) => {
              if (r === 0) {
                return (
                  <div>
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                    <AiOutlineStar />
                  </div>
                );
              } else {
                return <AiOutlineStar />;
              }
            })}
            </div>
          <input
            type="button"
            className={
              cart.findIndex((i) => i.id === product.id) !== -1
                ? "btn-remove"
                : "btn"
            }
            value={
              cart.findIndex((i) => i.id === product.id) !== -1
                ? "Remove from cart"
                : "Add to cart"
            }
            onClick={(e) => {
              handlerButtonCart(e);
            }}
          ></input>
        </div>
        <div className="productDetails__description">
          <p>{product.description}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, selectProductsById } from "../../store/productById";
import { selectCarts } from "../../store/cart";
import { useParams } from "react-router-dom";
import { setItem, deleteItem } from "../../store/cart";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import {selectThisUserRoles, selectThisUserId} from "../../store/thisUser";
import { ratingArray, ratingArrayEmpty } from "./numberToArray";
import { IconContext } from "react-icons";
import {selectComments} from "../../store/comments"
import Comment from "./Comment";
import "./ProductDetail.css";
import Loading from "../loading/Loading";
import api, { endPoint } from "../../lib/api";

const ProductDetail = () => {
  const rol = useSelector(selectThisUserRoles)
  const { id } = useParams();
  const cart = useSelector(selectCarts);
  const [condition, setCondition] = useState(true)
  const dispatch = useDispatch();
  const userId = useSelector(selectThisUserId);
  const product = useSelector(selectProductsById);
  const [imgIndex, setImgIndex] = useState(0);
  const [orders, setOrders] = useState();

  const image = product.images
    ?.filter((e) => e.image !== null)
    .map((e) => <img src={e.image} alt="image" />);

  useEffect(() => {
    (product.noProduct || product.error || product.id !== id) &&
      dispatch(getProductById(id));
  }, [id]);

  useEffect(() => {}, [cart, product]);

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
  console.log(product)
  function removeFromChart() {
    dispatch(deleteItem({ id: product.id }));
  }


  useEffect(()=>{
    if(typeof orders === "object"){
        const ordenes = orders.map((o)=>o.products.filter((p)=>p.id === product.id))
        if(ordenes.length > 0){
            setCondition(true)
        }else{
            setCondition(false)
        }
    }
  },[orders])

  useEffect(()=>{
    userId && 
    api.get(endPoint.orders).then(r=>{setOrders(r.data)})
  },[userId])

  return product.id ? (

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
            {ratingArray(product.rating).length > 0 &&
              ratingArray(product.rating).map((r) => {
                return (
                  <IconContext.Provider
                    value={{ className: "fillStar" }}
                  >
                    <AiFillStar />
                  </IconContext.Provider>
                );
              })}
            {ratingArrayEmpty(product.rating).length > 0 &&
              ratingArrayEmpty(product.rating).map((r) => {
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
            value={ rol[0] !== "Admin" ? 
              cart.findIndex((i) => i.id === product.id) !== -1
                ? "Remove from cart"
                : "Add to cart"
            : "Disable for Admin"}
            onClick={(e) => {
              handlerButtonCart(e);
            }}
            disabled={rol[0] === "Admin" ? true : false}
          ></input>
        </div>
        <div className="productDetails__description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        <div>
          {product.id && product.comments.length > 0 && <h3>Comments</h3>}

          {product.id &&
            product.comments.length > 0 &&
            product.comments.map((c) => {
              return (
                <div className="productDetail__comment">
                  <div>
                    <img
                      className="productDetail__comment-picture"
                      src={c.user.profile_picture}
                      alt={c.user.first_name + c.user.id}
                    ></img>
                  </div>
                  <div className="productDetail__comment-containerProfile">
                    <p className="productDetail__comment-name">
                      {c.user.first_name +
                        (c.user.last_name && " " + c.user.last_name)}
                    </p>
                    {/* <p className="productDetail__comment-ratingText">Rating:</p> */}
                    <p className="productDetail__comment-ratingStar">
                      {ratingArray(c.rating).length > 0 &&
                        ratingArray(c.rating).map((r) => {
                          return (
                            <IconContext.Provider
                              value={{ fill: "yellow", className: "fillStar" }}
                            >
                              <AiFillStar />
                            </IconContext.Provider>
                          );
                        })}
                      {ratingArrayEmpty(c.rating).length > 0 &&
                        ratingArrayEmpty(c.rating).map((r) => {
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
                    </p>
                  </div>
                  <div className="productDetail__comment-section">
                    <p className="productDetail__comment-value">{c.value}</p>
                  </div>
                </div>
              );
            })}
        </div>
        {condition && <Comment productId={id} setCondition={setCondition} condition={condition} userId={userId} orders={orders} setOrders={setOrders}/>}
      </div>
    </section>
  ) : (
    <Loading/>
  ) 
};

export default ProductDetail;

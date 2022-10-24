import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, selectProductsById } from "../../store/productById";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
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
          <button className="btn">Add to cart</button>
        </div>
        <div className="productDetails__description">
          <p>{product.description}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;

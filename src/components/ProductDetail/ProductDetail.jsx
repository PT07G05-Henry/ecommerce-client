import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, selectProductsById } from "../../store/productById";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import { FcApproval } from "react-icons/fc";
import { BsCart4 } from "react-icons/bs";

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
    <section className="product-detail">
      {image && image.length && (
        <div className="product-detail__img">
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
      <div className="product-detail__info">
        <h2 className="name">
          {" "}
          {product.name} <hr></hr>
        </h2>
        <div className="stock">
          <h3> Price:${product.price}</h3>
          <h3 className="stock">
            {" "}
            <FcApproval /> Stock:{product.stock}
          </h3>
        </div>
        <div>
          <button className="button-primary-add">
            <BsCart4 /> Add to cart{" "}
          </button>
          <p className="description">{product.description}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;

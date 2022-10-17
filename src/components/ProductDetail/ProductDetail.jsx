import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, selectProduct } from "../../store/api";
import { useParams } from "react-router-dom";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const [imgIndex, setImgIndex] = useState(0);
  const image = product.images
    ?.filter((e) => e.image !== null)
    .map((e) => <img src={e.image} alt="image" />);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch]);

  return (
    <section>
      {image && image.length && (
        <div className="card__imageViewer">
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

      <h2>{product.name}</h2>
      <h3>${product.price}</h3>
      <h3>stock: {product.stock}</h3>
      <button> Add to cart </button>
      <h4>Description</h4>
      <p>{product.description}</p>
    </section>
  );
};

export default ProductDetail;

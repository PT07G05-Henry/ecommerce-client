import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, selectProduct, updateProduct } from "../../store/api";
import validate from "./validate";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./UpdateProduct.css";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector(selectProduct);
  const ref = React.createRef();
  const [error, setError] = useState({});
  const [value, setValue] = useState("");
  const [input, setInput] = useState({ 
    id: id,
    images: [],
  });

  const [update, setUpdate] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    images: [],
  });
  const [inputHidden, setInputHidden] = useState({
    name: "hidden",
    price: "hidden",
    description: "hidden",
    stock: "hidden",
    images: "hidden",
  });

  const [imgIndex, setImgIndex] = useState(0);
  let image;
  if (update.images.length) {
    image = update.images
      ?.filter((e) => e.image !== null)
      .map((e) => (
        <div className="imageUpdate">
          <img src={e.image} alt="image" />
        </div>
      ));
  } else {
    image = product.images
      ?.filter((e) => e.image !== null)
      .map((e) => (
        <div className="imageUpdate">
          <img src={e.image} alt="image" />
        </div>
      ));
  }

  const { getIdTokenClaims } = useAuth0();

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleHidden = (e) => {
    e.preventDefault();
    setInputHidden({
      ...inputHidden,
      [e.target.value]: "show",
    });
  };

  const handleImageChange = (e) => {
    setValue(e.target.value);
  };

  const handleImageSubmit = () => {
    const image = ref.current.value;
    setInput({ ...input, images: [...input.images, { image: image }] });
    setValue("");
  };

  const handleImageCheck = () => {
    function testImage(URL) {
      var tester = new Image();
      tester.onload = imageFound;
      tester.onerror = imageNotFound;
      tester.src = URL;
    };

    function imageFound() {
      alert("That image is found and loaded");
      handleImageSubmit();
      return setError((err) => ({ ...err }));
    };
    
    function imageNotFound() {
      alert("That image was not found.");
      setValue("");
      if (!input.images) {
        return setError((err) => ({
          ...err,
          images: "That image was not found.",
        }));
      }
    }
    testImage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getIdTokenClaims()
      .then((r) => r.sid)
      .then((sid) => {
        if (input.images && input.images.length === 0)
          setInput(delete input.images);
        if (
          !input.images &&
          !input.name &&
          !input.price &&
          !input.description &&
          !input.stock
        )
          return alert("No values ​​to update");
        dispatch(updateProduct({ input, sid, setUpdate }));
      });
    setInputHidden({
      name: "hidden",
      price: "hidden",
      description: "hidden",
      stock: "hidden",
      images: "hidden",
    });
    setInput({
      id: id,
    });
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch]);

  return (
    <>
      <div className="formControled__centeredForm">
        <form onSubmit={handleSubmit}>
          <h1>Update Product</h1>
          {image && image.length && (
            <div className="card__imageViewer">
              <button
                className="card__imageViewer-arrow"
                style={imgIndex === 0 ? { display: "none" } : {}}
                onClick={(e) => {
                  e.preventDefault();
                  setImgIndex(imgIndex - 1);
                }}
              >
                {"<"}
              </button>
              {image[imgIndex]}
              <button
                className="card__imageViewer-arrow"
                style={imgIndex === image.length - 1 ? { display: "none" } : {}}
                onClick={(e) => {
                  e.preventDefault();
                  setImgIndex(imgIndex + 1);
                }}
              >
                {">"}
              </button>
            </div>
          )}
          <button value="images" onClick={handleHidden}>
            Edit
          </button>
          <div className={inputHidden.images}>
            <label htmlFor="images"> images: </label>
            <input
              type="text"
              name="images"
              id="images"
              ref={ref}
              value={value}
              onChange={handleImageChange}
            />
            <button onClick={handleImageCheck} type="button">
              check image
            </button>
            <p className="errorAlert__errorMessage">
              {error.images === "error" ? "" : error.images}
            </p>
          </div>
          {update.name ? <h2>{update.name}</h2> : <h2>{product.name}</h2>}
          <button value="name" onClick={handleHidden}>
            Edit
          </button>
          <div className={inputHidden.name}>
            <label htmlFor="name"> Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={input.name}
              onChange={handleInputChange}
            />
            <p className="errorAlert__errorMessage">{error.name}</p>
          </div>
          {update.price ? <h3>${update.price}</h3> : <h3>${product.price}</h3>}
          <button value="price" onClick={handleHidden}>
            Edit
          </button>
          <div className={inputHidden.price}>
            <label htmlFor="price"> Price: </label>
            <input
              type="number"
              name="price"
              id="price"
              value={input.price}
              onChange={handleInputChange}
              min="0"
              step=".01"
            />
            <p className="errorAlert__errorMessage">{error.price}</p>
          </div>
          {update.stock ? (
            <h3>Stock: {update.stock}</h3>
          ) : (
            <h3>Stock: {product.stock}</h3>
          )}
          <button value="stock" onClick={handleHidden}>
            Edit
          </button>
          <div className={inputHidden.stock}>
            <label htmlFor="stock"> Stock: </label>
            <input
              type="number"
              name="stock"
              id="stock"
              value={input.stock}
              onChange={handleInputChange}
              min="0"
            />
            <p className="errorAlert__errorMessage">{error.stock}</p>
          </div>
          {update.description ? (
            <p>{update.description}</p>
          ) : (
            <p>{product.description}</p>
          )}
          <button value="description" onClick={handleHidden}>
            Edit
          </button>
          <div className={inputHidden.description}>
            <label htmlFor="description"> Description: </label>
            <input
              type="text"
              name="description"
              id="description"
              value={input.description}
              onChange={handleInputChange}
            />
            <p className="errorAlert__errorMessage">{error.description}</p>
          </div>
          <input type="submit" value="Update" />
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;

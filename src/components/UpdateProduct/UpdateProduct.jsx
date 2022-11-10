import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  selectProduct,
  selectCategories,
} from "../../store/api";
import axios from "axios";
import validate from "./validate";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./UpdateProduct.css";
import api, { endPoint } from "../../lib/api";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector(selectProduct);
  const categories = useSelector(selectCategories);
  const ref = React.createRef();
  const [error, setError] = useState({});
  const [value, setValue] = useState([]);
  const [cat, setCat] = useState([]);
  const [input, setInput] = useState({
    id: id,
    images: [],
    categories: [],
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
    categories: "hidden",
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

  let concatCat = "";

  if (update.categories) {
    for (let i = 0; i < update.categories.length; i++) {
      if (i < update.categories.length - 1) {
        concatCat = concatCat.concat(update.categories[i], ", ");
      } else concatCat = concatCat.concat(update.categories[i]);
    }
  } else if (product.categories) {
    for (let i = 0; i < product.categories.length; i++) {
      if (i < product.categories.length - 1) {
        concatCat = concatCat.concat(product.categories[i].name, ", ");
      } else concatCat = concatCat.concat(product.categories[i].name);
    }
  }

  const handleHidden = (e) => {
    e.preventDefault();
    setInputHidden({
      ...inputHidden,
      [e.target.value]: "show",
    });
  };

  const handleImageSubmit = () => {
    setValue([...value, ref.current.files[0].name]);
    setInput({ ...input, images: [...input.images, ref.current.files] });
    alert("Entered image");
  };

  const handleCategories = (e) => {
    const newCategorie = e.target.value;
    const select = document.getElementById("selectId");
    const id = select.options[select.selectedIndex].id;
    if (input.categories.length >= 3)
      return alert("Maximum 3 categories per product.");
    if (!input.categories.includes(parseInt(id))) {
      setCat([...cat, newCategorie]);
      setInput({ ...input, categories: [...input.categories, parseInt(id)] });
    } else alert(`The ${newCategorie} category is already selected`);
  };

  function handleClick(e) {
    setCat(cat.filter((c) => c !== e.target.value));
    let id = categories.map((c) => c.name).indexOf(e.target.value) + 1;
    setInput({
      ...input,
      categories: input.categories.filter((c) => c !== id),
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getIdTokenClaims()
      .then((r) => r.sid)
      .then((sid) => {
        if (input.images && input.images.length === 0)
          setInput(delete input.images);
        if (
          JSON.stringify(input.categories) ===
          JSON.stringify(product.categories.map((c) => c.id))
        )
          setInput(delete input.categories);
        if (
          !input.images &&
          !input.name &&
          !input.price &&
          !input.description &&
          !input.stock &&
          !input.categories
        ) {
          setInput({
            id: id,
            images: [],
            categories: product.categories
              ? [...product.categories.map((c) => c.id)]
              : [],
          });
          return alert("No values to update");
        } else if (input.categories && input.categories.length === 0) {
          setInput({
            id: id,
            images: [],
            categories: product.categories
              ? [...product.categories.map((c) => c.id)]
              : [],
          });
          setCat([...product.categories.map((c) => c.name)]);
          return alert("Select at least one category");
        }
        try {
          let formData = new FormData();
          Object.keys(input).forEach((key) => {
            formData.append(key, input[key]);
          });
          input.images &&
            input.images.length &&
            input.images.forEach((file) => {
              formData.append("images", file[0], file[0].name);
            });
          axios
            .put(
              `https://${
                process.env.REACT_APP_DEV_API || document.domain
              }/products?sid=${sid}`,
              formData
            )
            //api.put(endPoint.products, {input})
            .then((res) => {
              setUpdate({
                name: res.data.name,
                price: res.data.price,
                description: res.data.description,
                stock: res.data.stock,
                images: res.data.images,
                categories: res.data.categories.map((c) => c.name),
              });
              setInput({
                id: id,
                images: [],
                categories: res.data.categories
                  ? [...res.data.categories.map((c) => c.id)]
                  : [],
              });
              alert("Product updated successfully");
            });
        } catch (error) {
          alert("Error: " + error.message);
          console.error(error);
        }
      });
    setInputHidden({
      name: "hidden",
      price: "hidden",
      description: "hidden",
      stock: "hidden",
      images: "hidden",
      categories: "hidden",
    });
    setValue([]);
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch]);

  useEffect(() => {
    setInput({
      ...input,
      categories: product.categories
        ? [...product.categories.map((c) => c.id)]
        : [],
    });
    if (concatCat && !cat.includes(concatCat.split(",")))
      setCat(concatCat.split(","));
  }, [product]);

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Update Product</h1>
          {image && image.length && (
            <div className="image_arrow">
              <button
                className="btn-rounded arrow-back"
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
                className="btn-rounded arrow-next"
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
          <button className="btn" value="images" onClick={handleHidden}>
            Edit
          </button>
          <div className={inputHidden.images}>
            <label htmlFor="images"> images: </label>
            <input type="file" name="images" id="images" ref={ref} />
            <button className="btn" onClick={handleImageSubmit} type="button">
              enter image
            </button>
            <div>
              <p>Selected images:</p>
              {value.map((v, index) => <p key={index}>{v}</p>)}
            </div>
          </div>
          {update.name ? <h2>{update.name}</h2> : <h2>{product.name}</h2>}
          <button className="btn" value="name" onClick={handleHidden}>
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
          <button className="btn" value="price" onClick={handleHidden}>
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
          <button className="btn" value="stock" onClick={handleHidden}>
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
          <button className="btn" value="description" onClick={handleHidden}>
            Edit
          </button>
          <div className={inputHidden.description}>
            <label htmlFor="description"> Description: </label>
            <textarea 
            className="description"
              cols="40"
              rows="5"
              type="text"
              name="description"
              id="description"
              value={input.description}
              onChange={handleInputChange}
            />
            <p className="errorAlert__errorMessage">{error.description}</p>
          </div>
          <h3>categories: {concatCat}</h3>
          <button className="btn" value="categories" onClick={handleHidden}>
            Edit
          </button>
          <div className={inputHidden.categories}>
            <label htmlFor="select_categories"> Category: </label>
            <select
            className="select"
              id="selectId"
              name="select_categories"
              onChange={handleCategories}
            >
              {categories.length > 1 ? (
                categories.map((e) => (
                  <option key={e.id} id={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))
              ) : (
                <p>Loading</p>
              )}
            </select>
            <div className="selectedOptions">
              {cat &&
                cat.map((c, index) => (
                  <div key={index} className="option">
                    <p>{c}</p>
                    <button className="btn" type="button" value={c} onClick={handleClick}>
                      x
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <input className="btn" type="submit" value="Update" />
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, selectCategories, postProducts } from "../../store/api";
import { selectThisUser } from "../../store/thisUser";
import validate from "./validate";
import Card from "../Card/Card";
import "./createProduct.css";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  let userData = useSelector(selectThisUser);
  const ref = React.createRef();
  const [cat, setCat] = useState([]);
  const [error, setError] = useState({});
  const [value, setValue] = useState("");
  const [input, setInput] = useState({
    images: [],
    name: "",
    price: "",
    description: "",
    stock: "",
    categories: [],
  });
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleImageSubmit = () => {
    //const image = ref.current.value;
    setInput({ ...input, images: [...input.images, ref.current.files] });
    alert("Entered Image")
    setValue("");
  };

  // const handleImageCheck = () => {
  //   function testImage(URL) {
  //     var tester = new Image();
  //     tester.onload = imageFound;
  //     tester.onerror = imageNotFound;
  //     tester.src = URL;
  //   }
  //   function imageFound() {
  //     alert("That image is found and loaded");
  //     handleImageSubmit();
  //     return setError((err) => ({ ...err }));
  //   }
  //   function imageNotFound() {
  //     alert('That image was not found.');
  //     setValue("");
  //     if(!input.images){
  //       return setError((err) => ({
  //         ...err,
  //         images: "That image was not found.",
  //       }));
  //     }
  //   }
  //   testImage(value);
  // };

  const handleDelete = (e) => {
    const nombre = e.target.value;
    const id = cat.indexOf(nombre);
    if (input.categories) {
      setCat([].concat(cat.filter((e) => e !== nombre)));
      setInput({
        ...input,
        categories: input.categories.filter((e) => e !== input.categories[id]),
      });
    }
  };

  const handleCategories = (e) => {
    const newCategorie = e.target.value;
    const select = document.getElementById("selectId");
    const id = select.options[select.selectedIndex].id;
    if (!input.categories.includes(id)) {
      setCat([...cat, newCategorie]);
      setInput({ ...input, categories: [...input.categories, id] });
    }
  };

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
  const handleImageChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    Object.keys(input).forEach((key) => {
      formData.append(key, input[key]);
    });
    if (ref.current) {
        input.images.forEach((file) => { formData.append( "images", file[0], file[0].name )})
    }
    dispatch(postProducts(formData));
    setInput({
      images: [],
      name: "",
      price: "",
      description: "",
      stock: "",
      categories: [],
    });
    setValue("");
    setCat([]);
  };

  return (
    <>
      <div className="formControled__centeredForm">
        <form onSubmit={handleSubmit}>
          <h1>Create Product</h1>
          <label htmlFor="images"> Images: </label>
          <input
            type="file"
            name="images"
            id="images"
            ref={ref}
            onChange={handleImageChange}
          />
          <button onClick={handleImageSubmit} type="button">
            enter image
          </button>
          <p className="errorAlert__errorMessage">
            {error.images === "error" ? "" : error.images}
          </p>
          <label htmlFor="name"> Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={input.name}
            onChange={handleInputChange}
          />
          <p className="errorAlert__errorMessage">{error.name}</p>
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
          <label htmlFor="description"> Description: </label>
          <input
            type="text"
            name="description"
            id="description"
            value={input.description}
            onChange={handleInputChange}
          />
          <p className="errorAlert__errorMessage">{error.description}</p>
          <div>
            <label htmlFor="select_categories"> Category: </label>
            <select
              id="selectId"
              name="select_categories"
              onChange={handleCategories}
            >
              <option value="" disabled selected></option>
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
          </div>
          {Object.keys(error).length === 0 &&
          input.categories.length >= 1 &&
          input.images.length ? (
            <input type="submit" value="Create" />
          ) : (
            <input type="submit" value="Create" disabled={true} />
          )}
        </form>
      </div>
      <div className="createdProduct__exampleCard">
        {input && userData.roles && (
          <Card
            id={input.id}
            images={input.images}
            name={input.name}
            price={input.price}
            description={input.description}
            stock={input.stock}
            categoriesName={cat}
            isCreated={true}
            handleDelete={handleDelete}
            rol={userData.roles[0]}
          />
        )}
      </div>
    </>
  );
};

export default CreateProduct;

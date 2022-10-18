import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, selectCategories } from "../../store/api";
import validate from "./validate";
import validateImage from "./validateImage";
import Card from "../Card/Card";
import "./createProduct.css";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
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
    const image = ref.current.value;
    setInput({ ...input, images: [...input.images, { image: image }] });
    setValue("");
  };

  const handleDelete = (e) => {
    const nombre = e.target.value;
    const id = cat.indexOf(nombre);
    if(input.categories){
      setCat(cat.filter((e)=>e !== nombre));
      setInput({...input, categories: input.categories.filter((e)=>e !== id)})
    }
    // const category = parseInt(e.target.value.split("_"));
    // const category2 = e.target.value;
    // console.log(category);
    // if (input.categories)
    //   setInput({
    //     ...input,
    //     categories: input.categories.filter((e) => e !== `${category}`),
    //   });
    // setCat(cat.filter((e) => e !== category2));
  };

  const handleCategories = (e) => {
    const newCategorie = e.target.value;
    const select = document.getElementById("selectId");
    const id = select.options[select.selectedIndex].id;
    setCat([...cat, newCategorie]);
    setInput({ ...input, categories: [...input.categories, id] });
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
    function testImage(URL) {
      var tester=new Image();
      tester.onload=imageFound;
      tester.onerror=imageNotFound;
      tester.src=URL;
    }
    function imageFound() {
        alert('That image is found and loaded');
        return setError((err)=>({...err, images:""}))
    }
    function imageNotFound() {
        alert('That image was not found.');
        return setError((err)=>({...err, images:"That image was not found."}))
    }
    testImage(e.target.value);
    // setError(validateImage(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(
      `http://${process.env.REACT_APP_DEV_API || document.domain}/products`,
      input
    );
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
          type="text"
          name="images"
          id="images"
          ref={ref}
          value={value}
          onChange={handleImageChange}
        />
        <button onClick={handleImageSubmit} type="button">
          add image
        </button>
        <p className="errorAlert__errorMessage">{error.images}</p>


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
      {input&&<Card id={input.id} images={input.images} name={input.name} price={input.price} description={input.description} stock={input.stock}  categoriesName={cat} isCreated={true} handleDelete={handleDelete}/>}
    </div>
    </>
  );
};

export default CreateProduct;

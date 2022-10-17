import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, selectCategories } from "../../store/api";

const CreateProduct = () => {
    const dispatch = useDispatch()
    const categories = useSelector(selectCategories)
  const [input, setInput] = useState({
    images: [],
    name: "",
    price: "",
    description: "",
    stock: "",
    categories: [],
  });

  useEffect(()=>{
    dispatch(getCategories())

  },[dispatch])

  const handleCategories = (e) => {
    const newCategorie = e.target.value
    setInput({...input, categories:[...input.categories, newCategorie]})
  }

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(
      `http://${process.env.REACT_APP_DEV_API || document.domain}/products`,
      input
    );
    setInput({
      name: "",
      price: "",
      description: "",
      stock: "",
      categories: [],
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="images"> Images: </label>
        <input
          type="text"
          name="images"
          id="images"
          value={input.images}
          onChange={handleInputChange}
        /> */}
        <label htmlFor="name"> Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          value={input.name}
          onChange={handleInputChange}
        />
        <label htmlFor="price"> Price: </label>
        <input
          type="number"
          name="price"
          id="price"
          value={input.price}
          onChange={handleInputChange}
        />
        <label htmlFor="description"> Description: </label>
        <input
          type="text"
          name="description"
          id="description"
          value={input.description}
          onChange={handleInputChange}
        />
        <label htmlFor="stock"> Stock: </label>
        <input
          type="number"
          name="stock"
          id="stock"
          value={input.stock}
          onChange={handleInputChange}
        />
        <div>
            <select name="select categories" onChange={handleCategories}>
                { categories.length > 1 ? categories.map(e => <option key={e.id} value={e.name}>{e.name}</option>): <p>Loading</p> }
            </select>
        </div>
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

export default CreateProduct;

import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, selectCategories } from "../../store/api";
import Card from "../Card/Card";
import "./category.css";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const ref = React.createRef();
  const [cat, setCat] = useState([]);
  const [error, setError] = useState({});
  const [value, setValue] = useState("");
  const [input, setInput] = useState({
    image: "",
    name: "",
  });
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleImageSubmit = () => {
    const image = ref.current.value;
    setInput({ ...input, image: image });
  };

  const handleImageCheck = () => {
    function testImage(URL) {
      var tester = new Image();
      tester.onload = imageFound;
      tester.onerror = imageNotFound;
      tester.src = URL;
    }
    function imageFound() {
      alert("That image is found and loaded");
      handleImageSubmit();
      return setError((err) => ({ ...err }));
    }
    function imageNotFound() {
      alert("That image was not found.");
      setValue("");
      if (!input.image) {
        return setError((err) => ({
          ...err,
          image: "That image was not found.",
        }));
      }
    }
    testImage(value);
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

    const result = categories.filter((a) => a.name.toLowerCase() === e.target.value.toLowerCase())
    if (result.length > 0){
        setError((err) => ({...err,name:`Category name "${e.target.value}" already exist`}));
    }
  };
  const handleImageChange = (e) => {
    setValue(e.target.value);
    // setError(validateImage(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(
      `http://${process.env.REACT_APP_DEV_API || document.domain}/categories`,
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

  function validate(input) {
    
    const error = {};
    const regexName =
      /^[A-Z]+[^\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]*$/; //^[a-zA-Zñáéíóúü]*$

    if (!input.name) error.name = "need a product name";

    if (!regexName.test(input.name))
      error.name = "The first letter has to be uppercase, and only letters";

    if (input.name.length < 3 || input.name.length > 30)
      error.name = "between 3 and 30 characters";

    return error;
  }
  return (
    <>
      <div className="formControled__centeredForm">
        <form onSubmit={handleSubmit}>
          <h1>Create Category</h1>
          <div className="ContainerImgInput">
            <label htmlFor="images"> Image: </label>
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
            {input.image && (
              <img
                className="ImgCheck"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Yes_Check_Circle.svg/1200px-Yes_Check_Circle.svg.png"
                alt="check"
              ></img>
            )}
          </div>
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
          {Object.keys(error).length === 0 && input.name && input.image ? (
            <input type="submit" value="Create" />
          ) : (
            <input type="submit" value="Create" disabled={true} />
          )}

          {(input.image || input.name) && (
            <div className="InfoCategory">
              <h2>You are creating this category</h2>
              {input.image && (
                <img
                  className="CategoryImg"
                  src={input.image}
                  alt="CategoryImage"
                ></img>
              )}
              {input.name && <h3 className="CategoryName">{input.name}</h3>}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default CreateCategory;

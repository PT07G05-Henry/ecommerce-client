import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  postCategories,
  selectCategories,
} from "../../store/api";

import { useAuth0 } from "@auth0/auth0-react";
import "./createcategory.css";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const ref = React.createRef();
  const { getIdTokenClaims } = useAuth0();
  const [cat, setCat] = useState([]);
  const [error, setError] = useState({});
  const [value, setValue] = useState("");
  const [input, setInput] = useState({
    image: "",
    name: "",
  });
  const internalDispatch = useDispatch();
  const categoriesList = useSelector(selectCategories);
  useEffect(() => {
    if (categoriesList) {
      (categoriesList[0].toBeField || categoriesList[0].error) &&
        internalDispatch(getCategories());
    }
  }, [categoriesList]);
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

    if (categories) {
      const result = categories.filter(
        (a) => a.name && a.name.toLowerCase() === e.target.value.toLowerCase()
      );
      if (result.length > 0) {
        setError((err) => ({
          ...err,
          name: `Category name "${e.target.value}" already exist`,
        }));
      }
    }
  };

  const handleImageChange = (e) => {
    setValue(e.target.value);
    // setError(validateImage(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getIdTokenClaims()
      .then((r) => r.sid)
      .then((sid) => dispatch(postCategories({ input, sid })))
      .then(() => {
        alert(`Category ${input.name} was created`);
      })
      .catch(() => {
        alert(`Error creating the Category`);
      });

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
      <div className="create_category">
        <form className="category" onSubmit={handleSubmit}>
          <div className="title">
            <h1>Create Category</h1>
          </div>
          <label htmlFor="name"> Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={input.name}
            onChange={handleInputChange}
          />
          {error.name && <p className="errorMessage">{error.name}</p>}
          {Object.keys(error).length === 0 && input.name ? (
            <button type="submit" className="btn" id="btn">
              {" "}
              Create{" "}
            </button>
          ) : null}

          <div className="InfoCategory">
            <h4>You are creating this category</h4>
            {input.name && <h2 className="CategoryName">{input.name}</h2>}
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;

import React, { useState, useEffect } from "react";
import { PAGE } from "../../store/api";
import { useNavigate } from "react-router-dom";
import "./categories.css";

const Category = ({ data, dispatch }) => {
  const [controller, setController] = useState(data);
  const [change, setChange] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState({});
  const [allCategory, setAllCategory] = useState([]);

  const addToController = (flag) => {
    setController({ ...controller, ...flag });
    dispatch({ ...controller, ...flag });
    setChange(!change);
  };

  useEffect(() => {
    change && dispatch(controller);
    const catData = data.map((e) => ({
      id: e.id,
      name: e.name,
      image: e.image,
    }));
    catData.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setAllCategory(catData);
  }, [controller]);

  
  return (
    <>
      <div class="dropdown">
        <a className="btn btn-primary dropbtn" href={`#`}>Categories</a>
        <div className="dropdown-content">
          {allCategory &&
            allCategory?.map((e,i) => {
              return (
                <>
                  <a key={i} href={`/catalog/${e.id}`}>{e.name}</a>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Category;
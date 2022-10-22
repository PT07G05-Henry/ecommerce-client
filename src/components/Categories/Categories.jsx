import React, { useState, useEffect } from "react";
import { PAGE } from "../../store/api";
import { useNavigate } from "react-router-dom";
//import "./paginated.css";

const Category = ({ data, dispatch }) => {
  const [controller, setController] = useState(data);
  const [change, setChange] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState({})
  const [allCategory, setAllCategory] = useState([]);

  const addToController = (flag) => {
    setController({ ...controller, ...flag });
    dispatch({ ...controller, ...flag })
    setChange(!change);
  };

  useEffect(() => {
    change && dispatch(controller);
    const catData = data.map((e) => ({id:e.id, name: e.name, image:e.image}));
    
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
    })
    setAllCategory(catData)
  }, [controller, ]);



  //   function pag(a) {
  //     return (
  //       <input
  //         key={a}
  //         id={"paginadoNum" + a}
  //         className={`${Number(data.page) === Number(a) ? "active" : ""} btn`}
  //         type="button"
  //         onClick={(e) => todo(e)}
  //         value={a}
  //         disabled={data.page === a.toString()}
  //       />
  //     );
  //   }

  //   function todo(e) {
  //     const flag = { [PAGE]: e.target.value.toString() };
  //     addToController(flag);
  //   }
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          setShow(!show);
                }}
      >
        Categories
      </button>

      <div className="nav__user-menu" style={show ? {} : { display: "none" }}>
        {allCategory && allCategory?.map((e,i) => {
          return (
            <button
              key={i}
              className="btn btn-primary"
              onClick={() => {navigate(`/catalog/${e.id}`)}}
              value={e.name}
            >
              {e.name}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Category;

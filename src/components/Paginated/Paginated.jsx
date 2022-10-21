import React, { useState, useEffect } from "react";
import { PAGE } from "../../store/api";
import "./paginated.css";

const Cards = ({ data, dispatch }) => {
  const [controller, setController] = useState(data.query);
  const [arrayPag, setArrayPag] = useState([]);
  const [change, setChange] = useState(false);

  const addToController = (flag) => {
    setController({ ...controller, ...flag });
    setChange(!change);
  };

  useEffect(() => {
    change && dispatch(controller);
    const array = [];
    for (let i = 1; i <= data.totalPage; i++) {
      array.push(i);
    }
    arrayLeftSM(data.page);
    arrayLeftMD(data.page);
    arrayLeftLG(data.page);
    arrayRightSM(data.page);
    arrayRightMD(data.page);
    arrayRightLG(data.page);
  }, [controller]);

  function arrayLeftSM(page) {
    if (page <= 2) {
      if (page <= 1) {
        return [];
      }
      return [1];
    }
    const array = [];
    page = Number(page);
    for (let i = page - 1; i > page - 3; i--) {
      array.unshift(i);
    }
    return array;
  }

  function arrayLeftMD(page) {
    if (page <= 4) {
      if (page <= 3) {
        return [];
      }
      return [1];
    }
    const array = [];
    page = Number(page);
    for (let i = page - 3; i > page - 5; i--) {
      array.unshift(i);
    }
    return array;
  }
  function arrayLeftLG(page) {
    if (page <= 6) {
      if (page <= 5) {
        return [];
      }
      return [1];
    }
    const array = [];
    page = Number(page);
    for (let i = page - 5; i > page - 7; i--) {
      array.unshift(i);
    }
    return array;
  }

  function arrayRightSM(page) {
    if (data.totalPage - page < 2) {
      if (data.totalPage - page < 1) {
        return [];
      }
      return [data.totalPage];
    }
    const array = [];
    page = Number(page);
    for (let i = page + 1; i < page + 3; i++) {
      array.push(i);
    }
    return array;
  }

  function arrayRightMD(page) {
    if (data.totalPage - page < 4) {
      if (data.totalPage - page < 3) {
        return [];
      }
      return [data.totalPage];
    }
    const array = [];
    page = Number(page);
    for (let i = page + 3; i < page + 5; i++) {
      array.push(i);
    }
    return array;
  }
  function arrayRightLG(page) {
    if (data.totalPage - page < 6) {
      if (data.totalPage - page < 5) {
        return [];
      }
      return [data.totalPage];
    }
    page = Number(page);
    const array = [];
    for (let i = page + 5; i < page + 7; i++) {
      array.push(i);
    }
    return array;
  }

  function pag(a) {
    return (
      <input
        key={a}
        id={"paginadoNum" + a}
        className={`${Number(data.page) === Number(a) ? "active" : ""} btn`}
        type="button"
        onClick={(e) => todo(e)}
        value={a}
        disabled={data.page === a.toString()}
      />
    );
  }

  function todo(e) {
    if (e.target.value === "PrevPag") {
      window.location.hash = `#${data.page}`;
      dispatch(data.prev);
      return;
    }
    if (e.target.value === "NextPag") {
      window.location.hash = `#${data.page}`;
      dispatch(data.next);
      return;
    }
    window.location.hash = `#${e.target.value}`;
    const flag = { [PAGE]: e.target.value.toString() };
    addToController(flag);
  }
  return (
    <>
      <div className="divCenter">
        <div className="cards__controller">
          <div className="cards__controller-pagerL">
            <div className="pager___button-lg">
              {arrayLeftLG(data.page).map((a) => {
                return pag(a);
              })}
            </div>
            <div className="pager___button-md">
              {arrayLeftMD(data.page).map((a) => {
                return pag(a);
              })}
            </div>
            <div className="pager___button-sm">
              {arrayLeftSM(data.page).map((a) => {
                return pag(a);
              })}
            </div>
            {/* botton prev */}
            <div className="pager___button-prev">
              <button
                className="btn"
                value="PrevPag"
                onClick={(e) => {
                  todo(e);
                }}
                style={!data.prev ? { display: "none" } : undefined}
              >
                {"<<"}
              </button>
            </div>
          </div>
          <div className="pager___button-page">
            {data.page + "/" + data.totalPage}
          </div>
          <div className="cards__controller-pagerR">
            {/* botton next */}
            <div className="pager___button-next">
              <button
                className="btn"
                value="NextPag"
                onClick={(e) => {
                  todo(e);
                }}
                style={!data.next ? { display: "none" } : undefined}
              >
                {">>"}
              </button>
            </div>
            <div className="pager___button-sm">
              {arrayRightSM(data.page).map((a) => {
                return pag(a);
              })}
            </div>
            <div className="pager___button-md">
              {arrayRightMD(data.page).map((a) => {
                return pag(a);
              })}
            </div>
            <div className="pager___button-lg">
              {arrayRightLG(data.page).map((a) => {
                return pag(a);
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;

// import React, { useEffect }  from "react";
// import "./home.css";
// import { useDispatch, useSelector } from "react-redux";
// import Paginated2 from "../../components/Paginated/Paginated2"
// import { getProducts, selectProducts } from "../../store/api";
// import Loading from "../../components/loading/Loading";

// const Home = () => {
//   const dispatch = useDispatch();
//   const products = useSelector(selectProducts);
//   useEffect(() => {
//     products &&
//       (products.toBeField || products.error) &&
//       dispatch(getProducts());
//   }, [products]);
//   return (
//     <section className="container home__container">
//       <h1>Home!</h1>
//       {products.results ? <Paginated2 data={products} dispatch={(flags) => {
//             dispatch(getProducts(flags));}}/>: <Loading />}
      
//     </section>
//   );
// };

// export default Home;
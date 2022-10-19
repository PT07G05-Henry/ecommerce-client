import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import {
  PAGE,
  QUANTITY,
  CATEGORY,
  TYPE_ORDER,
  ASC,
  DESC,
  ORDERBY,
} from "../../store/api";
import "./cards.css";

const Cards = ({ products, dispatch }) => {
  const [controller, setController] = useState(products.query);
  const [arrayPag, setArrayPag] = useState([]);
  const [change, setChange] = useState(false);
  let buttons = [];
  const removeOfController = (flag) => {
    let newController = controller;
    delete controller[flag];
    setController(newController);
    setChange(!change);
  };
  const addToController = (flag) => {
    setController({ ...controller, ...flag });
    setChange(!change);
  };
  // for (let i = 10; i <= products.totalPage; i += 10)
  //   buttons.push(
  //     <button
  //       className="btn"
  //       onClick={() => {
  //         const flag = { [PAGE]: i.toString() };
  //         addToController(flag);
  //       }}
  //     >
  //       {" "}
  //       {i}{" "}
  //     </button>
  //   );

  useEffect(() => {
    change && dispatch(controller);
    setArrayPag([]);

    // const inicio = (Number(products.page) <= 5 ? 1: Number(products.page)-5);
    // const final = (Number(products.totalPage) <= 5 ? Number(products.totalPage) : Number(products.page) > 5 ? Number(products.page)+5 > Number(products.totalPage) ? Number(products.totalPage) : Number(products.page)+5 : 10); // tp=50 > 8
    // console.log("inicio",inicio);
    // console.log("final",final)
    // console.log("logica",products.totalPage > 9)
    // for(let i = inicio; i <= final; i++){
    //   setArrayPag((e)=>[...new Set([...e,(i)])])
    // }
    const array = [];
    for (let i = 1; i <= products.totalPage; i++) {
      array.push(i);
    }
    paginate(array, products.page, 5, products.totalPage);
  }, [controller]);

  function paginate(array, pageNumber, separetion, totalPage) {
    if (totalPage - pageNumber < 5) {
      setArrayPag(array.slice(-10));
      return;
    }
    if (pageNumber < 5) {
      setArrayPag(array.slice(0, 10));
      return;
    }
    setArrayPag(
      array.slice(
        Number(pageNumber) - Number(separetion) < 0
          ? 0
          : Number(pageNumber) - Number(separetion),
        Number(pageNumber) + Number(separetion)
      )
    );
  }

  function pag(a) {
    return (
      <input
        key={a}
        id={"paginadoNum" + a}
        className={`${Number(products.page) === Number(a) ? "active" : ""} btn`}
        type="button"
        onClick={(e) => todo(e)} //cambiar esto
        value={a}
        disabled={products.page === a.toString()}
      />
    );
  }

  function todo(e) {
    if (e.target.value === "PrevPag") {
      window.location.hash = `#${products.page}`;
      dispatch(products.prev);
      return;
      // setCurrentPage(products.page - 1)
    }
    if (e.target.value === "NextPag") {
      window.location.hash = `#${products.page}`;
      dispatch(products.next);
      return;
    }
    window.location.hash = `#${e.target.value}`;
    const flag = { [PAGE]: e.target.value.toString() };
    addToController(flag);
    // setCurrentPage(Number(e.target.value))
  }
  return (
    <>
      <div className="divCenter">
        <p className="btn">page: {products.page}</p>
        <div className="cards__controller">
          <div className="cards__controller-filters"></div>
          <div className="cards__controller-pager">
            {/* botton prev */}
            <button
              className="btn"
              value="PrevPag"
              onClick={(e) => {
                todo(e);
              }}
              style={!products.prev ? { display: "none" } : undefined}
            >
              {"<"}
            </button>

            {/* {buttons} */}
            {/* paginado numerado */}
            {products.page > 5 && pag(1)}
            {products.page > 5 && (
              <input
                type="button"
                className="btnDots"
                value={"..."}
                disabled
              ></input>
            )}

            {arrayPag.length !== 0 &&
              arrayPag.map((a) => {
                return pag(a);
              })}
            {products.totalPage - products.page > 5 && (
              <input
                type="button"
                className="btnDots"
                value={"..."}
                disabled
              ></input>
            )}
            {products.totalPage - products.page > 5 && pag(products.totalPage)}
            {/* botton next */}
            <button
              className="btn"
              value="NextPag"
              onClick={(e) => {
                todo(e);
              }}
              style={!products.next ? { display: "none" } : undefined}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
      <div className="cards__grid">
        {products.results?.map((el) => (
          <Card
            key={`product_${el.id}`}
            id={el.id}
            images={el.images}
            name={el.name}
            price={el.price}
          />
        ))}
      </div>
    </>
  );
};

export default Cards;

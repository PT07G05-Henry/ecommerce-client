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
  ID,
  PRICE,
  DESCRIPTION,
  STOCK,
  RATING,
  USER_ROL_ID,
} from "../../store/api";
import "./cards.css";
import { ImFilter } from "react-icons/im";

const REMOVE = "remove";

const Cards = ({ products, dispatch }) => {
  const [controller, setController] = useState(products.query);
  const [arrayPag, setArrayPag] = useState([]);
  const [change, setChange] = useState(false);
  let buttons = [];
  const removeOfController = (key) => {
    let newController = controller;
    delete newController[key];
    setController(newController);
    setChange(!change);
  };
  const addToController = (flag) => {
    setController({ ...controller, ...flag });
    setChange(!change);
  };

  useEffect(() => {
    change && dispatch(controller);
    setArrayPag([]);
    const array = [];
    for (let i = 1; i <= products.totalPage; i++) {
      array.push(i);
    }
    paginate(array, products.page, 5, products.totalPage);
  }, [controller]);

  //pager by Jorge ----
  function paginate(array, pageNumber, separation, totalPage) {
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
        Number(pageNumber) - Number(separation) < 0
          ? 0
          : Number(pageNumber) - Number(separation),
        Number(pageNumber) + Number(separation)
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
  //-------------------

  const quantity = {
    name: "Products per page",
    key: QUANTITY,
    values: [
      { [QUANTITY]: 25, label: "25 Items" },
      { [QUANTITY]: 50, label: "50 Items" },
      { [QUANTITY]: 75, label: "75 Items" },
      { [QUANTITY]: 100, label: "100 Items" },
    ],
  };

  const typeOrder = {
    name: "Order direction",
    key: TYPE_ORDER,
    values: [
      { [TYPE_ORDER]: ASC, label: "Ascendent" },
      { [TYPE_ORDER]: DESC, label: "Decedent" },
    ],
  };

  const orderBy = {
    name: "Order by",
    key: ORDERBY,
    values: [
      { [ORDERBY]: ID, label: "Id" },
      { [ORDERBY]: PRICE, label: "Price" },
      { [ORDERBY]: DESCRIPTION, label: "Description" },
      { [ORDERBY]: STOCK, label: "Stock" },
      { [ORDERBY]: RATING, label: "Rating" },
      { [ORDERBY]: USER_ROL_ID, label: "CreatedBy" },
    ],
  };

  const filters = [quantity, typeOrder, orderBy];

  const isInController = (key) => {
    const applied = Object.keys(controller);
    console.log(applied);
    return applied.length ? Boolean(applied.find((e) => e === key)) : false;
  };

  const applyFilter = (e, key) => {
    const flag = JSON.parse(e.target.value);
    flag[key] === REMOVE ? removeOfController(key) : addToController(flag);
  };

  const Filter = ({ name, key, values }) => {
    return (
      <label className="filter">
        {name}
        <select
          value={
            isInController(key)
              ? JSON.stringify({ [key]: controller[key] })
              : JSON.stringify({ [key]: REMOVE })
          }
          onChange={(e) => applyFilter(e, key)}
        >
          <option
            value={JSON.stringify({ [key]: REMOVE })}
            className="filter__option"
          >
            None
          </option>
          {values.map((option) => (
            <option
              key={`option_${key}-${option[key]}`}
              value={JSON.stringify({ [key]: option[key] })}
              className="filter__option"
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  };

  const Filters = ({ filters }) => {
    const [show, setShow] = useState(false);
    return (
      <>
        <button
          className="btn filters__btn"
          onClick={() => {
            setShow(!show);
          }}
        >
          <ImFilter />
        </button>
        <form
          action=""
          className="modal filters__modal"
          style={show ? undefined : { display: "none" }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {filters.map(({ name, key, values }) => (
            <Filter name={name} key={key} values={values} />
          ))}
        </form>
      </>
    );
  };

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
      <Filters filters={filters} />
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

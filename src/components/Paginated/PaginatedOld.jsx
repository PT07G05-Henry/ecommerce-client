import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { PAGE} from "../../store/api";
//import "./cards.css";

const Cards = ({ products, dispatch }) => {
  const [controller, setController] = useState(products.query);
  const [arrayPag, setArrayPag] = useState([]);
  const [change, setChange] = useState(false);

  const addToController = (flag) => {
    setController({ ...controller, ...flag });
    setChange(!change);
  };

  useEffect(() => {
    change && dispatch(controller);
    console.log(products.page)

    const array = [];
    for (let i = 1; i <= products.totalPage; i++) {
      array.push(i);
    }
    paginate(array, products.page, 5, products.totalPage);
    console.log(products.page)
    arrayLeftSM(products.page);
    arrayLeftMD(products.page);
    arrayLeftLG(products.page);
    arrayRightSM(products.page);
    arrayRightMD(products.page);
    arrayRightLG(products.page);

  }, [controller]);

  useEffect(()=>{
    console.log("holis")
  },[arrayPag])


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
  };

    function arrayLeftSM(page){ //1 Mobil 10
        const array = [];
        page = Number(page)
        for(let i = page-1; i > page-3 ; i--){ //Page = 10; i = 9 i = 8
            array.unshift(i); //[8,9]
        }
        console.log(array)
        return array;
    }

    function arrayLeftMD(page){ //2 Tablet
        const array = [];
        page = Number(page);
        for(let i = page-3; i > page-5 ; i--){ //Page = 10; i = 7 i = 6
            array.unshift(i); //[6,7]
        }
        console.log(array)
        return array;
    }
    function arrayLeftLG(page){ //3 Desktop
        const array = [];
        page = Number(page)
        for(let i = page-5; i > page-7 ; i--){ //Page = 10; i = 7 i = 6
            array.unshift(i); //[6,7]
        }
        console.log(array)
        return array;
    }

    function arrayRightSM(page){ //1 Mobil
        const array = [];
        page = Number(page)
        for(let i = page+1; i < page+3 ; i++){ //Page = 10; i = 11 i = 12
            array.push(i); //[11,12]
        }
        console.log(array)
        return array;
    }

    function arrayRightMD(page){ //2 Tablet
        const array = [];
        page = Number(page)
        for(let i = page+3; i < page+5 ; i++){ //Page = 10; i = 13 i = 14
            array.push(i); //[13,14]
        }
        console.log(array)
        return array;
    }
    function arrayRightLG(page){ //3 Desktop
        const array = [];
        page = Number(page)
        for(let i = page+5; i < page+7 ; i++){ //Page = 10; i = 15 i = 16
            array.push(i); //[16,17]
        }
        console.log(array)
        return array;
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
      <div className="divBlack">
        {}
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
              {"<<"}
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

            {arrayPag.length !== 0 ?
              arrayPag.map((a) => {
                return pag(a);
              }):"hola"}
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
              {">>"}
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

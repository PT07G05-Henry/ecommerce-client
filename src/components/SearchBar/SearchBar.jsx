import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoSearch } from "react-icons/go";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, selectProducts} from "../../store/products";
import { selectAllProducts, getAllProducts } from "../../store/allProducts";
import "./searchBar.css";

export default function SearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [product, setProduct] = useState("");
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState([]);

  function filterPreview(e) {
    
    setPreview([]);
    if (e.target.value === '') {
        setPreview([]);
    } else {
      let value = e.target.value.toLowerCase()
      const filter = products.filter((p)=> p.name.toLowerCase().includes(value) )
      console.log(filter)
      setPreview(filter)
        
        // for (const product of products) {
        //     let name = product.name.toLowerCase()
        //     if (name.includes(value) && preview.indexOf(product.name) === -1) {
        //         let result = [];
        //         result.push(product)
        //         setPreview(preview.concat(result))
        //     }
        // }
    }
  }

  function handleSubmit(e) {
    filterPreview(e);
    setProduct(e.target.value);
  }

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllProducts())
  }, [])


  return (
    <>
      <div className="searchBar__container">
        <div className="container searchBar__flex">
          <div className="searchBar__buttonPlace">
            
            {window.location.href === 'https://localhost:3000/' ? null : <div
              className="btn-rounded searchBar__button searchBar__backButton"
              onClick={() => {
                window.history.back();
              }}
            >
              <MdArrowBackIosNew size={24} />
            </div> }
          </div>
          <div className="searchBar__buttonPlace">
            <form
              style={!show ? { display: "none" } : undefined}
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/productsByName/${product}`);
                setProduct("");
                setPreview([]);
                setShow(!show);
              }}
              className="box searchBar"
            >
              <input
                className="searchBar-textInput"
                type="text"
                value={product}
                onChange={handleSubmit}
                placeholder="Search products..."
              />
              {preview.length>0 &&
              <div className="scroll">
              {preview.map((p) => {
                return <p><Link to={`/products/${p.id}`}
                    onClick={e => {
                        setProduct("");
                        setPreview([]);
                        setShow(!show);
                    }}>
                    {p.name}
                </Link>
                </p>
              })}
              </div>}
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
            <div
              className="btn-rounded searchBar__button"
              onClick={() => {
                setShow(!show);
              }}
            >
              <GoSearch size={24} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

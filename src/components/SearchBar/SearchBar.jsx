import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoSearch } from "react-icons/go";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, selectProducts } from "../../store/products";
import "./searchBar.css";

export default function SearchBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const [product, setProduct] = useState("");
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState([]);

    function filterPreview(e) {
        setPreview([]);
        if (e.target.value === '') {
            setPreview([]);
        } else {
            let value = e.target.value.toLowerCase()
            for (let product of products.results) {
                let name = product.name.toLowerCase()
                if (name.indexOf(value) !== -1 && !preview.includes(product)) {
                    let result = [];
                    result.push(product)
                    setPreview(preview.concat(result))
                }
            }
        }
    }

    function handleChange(e) {
        setProduct(e.target.value);
        filterPreview(e);
    }

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    return (
        <>
            <div className="searchBar__container">
                <div className="container searchBar__flex">
                    <div className="searchBar__buttonPlace">
                        <div
                            className="btn-rounded searchBar__button searchBar__backButton"
                            onClick={() => {
                                window.history.back();
                            }}
                        >
                            <MdArrowBackIosNew size={24} />
                        </div>
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
                                onChange={handleChange}
                                placeholder="Search products..."
                            />
                            {preview.map((p) => {
                                return <Link to={`/products/${p.id}`}
                                    onClick={e => {
                                        setProduct("");
                                        setPreview([]);
                                        setShow(!show);
                                    }}>
                                    {p.name}
                                </Link>
                            })}
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

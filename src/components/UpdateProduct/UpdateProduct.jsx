import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getProductById, selectProduct } from "../../store/api";
import validate from "../CreateProduct/validate";
import { useParams } from "react-router-dom";
import "./UpdateProduct.css";

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const product = useSelector(selectProduct);
    const [error, setError] = useState({});
    const [input, setInput] = useState({
        id: id
    });
    const [update, setUpdate] = useState({
        name: '',
        price: '',
        description: '',
        stock: '',
    })
    const [inputHidden, setInputHidden] = useState({
        name: "hidden",
        price: "hidden",
        description: "hidden",
        stock: "hidden",
    });

    const [imgIndex, setImgIndex] = useState(0);
    const image = product.images
        ?.filter((e) => e.image !== null)
        .map((e) => <img src={e.image} alt="image" />);

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProductById(id));
    }, [dispatch]);

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(
            `http://${process.env.REACT_APP_DEV_API || document.domain}/products`,
            input
        ).then((res) => {
            setUpdate({
                name: res.data.name,
                price: res.data.price,
                description: res.data.description,
                stock: res.data.stock,
            })
        });
        setInputHidden({
            name: "hidden",
            price: "hidden",
            description: "hidden",
            stock: "hidden",
        })
        setInput({
            id: id
        });
    };
    const handleHidden = (e) => {
        e.preventDefault();
        setInputHidden ({
            ...inputHidden,
            [e.target.value]: "show",
        })
    }

    return (
        <>
            <div className="formControled__centeredForm">
                <form onSubmit={handleSubmit}>
                    <h1>Update Product</h1>
                    {image && image.length && (
                    <div className="card__imageViewer">
                        <button
                            className="card__imageViewer-arrow" 
                            style={imgIndex === 0 ? { display: "none" } : {}}
                            onClick={() => setImgIndex(imgIndex - 1)}
                        >
                            {"<"}
                        </button>
                        {image[imgIndex]}
                        <button
                            className="card__imageViewer-arrow"
                            style={imgIndex === image.length - 1 ? { display: "none" } : {}}
                            onClick={() => setImgIndex(imgIndex + 1)}
                        >
                            {">"}
                        </button>
                    </div>
                    )}
                    {update.name ? <h2>{update.name}</h2>:<h2>{product.name}</h2>}
                    <button value="name" onClick={handleHidden}>Edit</button>
                    <div className={inputHidden.name}>
                        <label htmlFor="name"> Name: </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={input.name}
                            onChange={handleInputChange}
                        />
                        <p className="errorAlert__errorMessage">{error.name}</p>
                    </div>
                    {update.price ? <h3>${update.price}</h3>:<h3>${product.price}</h3>}
                    <button value="price" onClick={handleHidden}>Edit</button>
                    <div className={inputHidden.price}>
                        <label htmlFor="price"> Price: </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={input.price}
                            onChange={handleInputChange}
                            min="0"
                            step=".01"
                        />
                        <p className="errorAlert__errorMessage">{error.price}</p>
                    </div>
                    {update.stock ? <h3>Stock: {update.stock}</h3>:<h3>Stock: {product.stock}</h3>}
                    <button value="stock" onClick={handleHidden}>Edit</button>
                    <div className={inputHidden.stock}>
                        <label htmlFor="stock"> Stock: </label>
                        <input
                            type="number"
                            name="stock"
                            id="stock"
                            value={input.stock}
                            onChange={handleInputChange}
                            min="0"
                        />
                        <p className="errorAlert__errorMessage">{error.stock}</p>
                    </div>
                    {update.description ? <p>{update.description}</p>:<p>{product.description}</p>}
                    <button value="description" onClick={handleHidden}>Edit</button>
                    <div className={inputHidden.description}>
                        <label htmlFor="description"> Description: </label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={input.description}
                            onChange={handleInputChange}
                        />
                        <p className="errorAlert__errorMessage">{error.description}</p>
                    </div>
                    <input type="submit" value="Update" />
                </form>
            </div>
        </>
    )
}

export default UpdateProduct;

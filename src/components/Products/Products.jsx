import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, selectProducts } from "../../store/api";
import { Link } from 'react-router-dom';
import Paginated from "../Paginated/Paginated.jsx";
import api from "../../lib/api";

export default function Orders() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const handleDelete = async function(e) {
    const id = e.target.value;
    try {
      await api.delete("products", {
        params: { id: id }
      });
      alert('Product deleted succesfully')
    } catch(e) {
      alert('Error ' + e.message);
    };
  };
  
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <Paginated
        data={products}
        dispatch={(flags) => {
          dispatch(getProducts(flags))
        }}
      />
      <table>
        <tbody>
          <tr>
            <th>Product number</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Delete</th>
          </tr>
        </tbody>
        {products.results &&
          products.results.map((product, index) => (
            <tbody key={index}>
              <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  {product.id && (
                    <button
                      className="btn"
                      value={product.id}
                      onClick={handleDelete}
                    >
                      X
                    </button>
                  )}
                </td> 
                <td>
                  <Link to={`/update/product/${product.id}`}>Update</Link> 
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </>
  );
}
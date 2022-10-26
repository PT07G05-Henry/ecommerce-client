import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, selectProducts } from "../../store/api";
import { Link } from 'react-router-dom';

export default function Orders() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Product number</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
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
                  <Link to={`/update/product/${product.id}`}>Update</Link> 
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </>
  );
}
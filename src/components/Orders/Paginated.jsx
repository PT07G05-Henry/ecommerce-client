import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Paginated(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([]);

  function awaitOrders() {
    if (props.filteredOrders.length && props.filteredOrders[0].id) {
      setItems([...props.filteredOrders].splice(0, 10));
    } else {
      props.setFilteredOrders(props.orders);
    }
    setCurrentPage(0);
  }

  let totalPages = 1;

  if (props.filteredOrders.length) {
    totalPages =
      Math.floor(props.filteredOrders.length / 10) !== 0
        ? Math.floor(props.filteredOrders.length / 10)
        : 1;
  } else {
    totalPages =
      Math.floor(props.orders.length / 10) !== 0
        ? Math.floor(props.orders.length / 10)
        : 1;
  }

  const current = currentPage + 1 > totalPages ? 1 : currentPage + 1;

  function nextHandler() {
    const total = props.filteredOrders.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * 10;
    if (firstIndex >= total) return;
    setItems([...props.filteredOrders].splice(firstIndex, 10));
    setCurrentPage(nextPage);
  }

  function prevHandler() {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * 10;
    setItems([...props.filteredOrders].splice(firstIndex, 10));
    setCurrentPage(prevPage);
  }

  useEffect(() => {
    awaitOrders();
  }, [props.filteredOrders, props.orders]);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Order number</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </tbody>
        {items &&
          items.map((order, index) => (
            <tbody key={index}>
              <tr>
                <td>{order.id}</td>
                <td>${order.total_price}</td>
                <td>{order.status}</td>
                <td>{order.createdAt && order.createdAt.slice(0, 10)}</td>
                <td>
                  <Link to={`/orDetail/${order.id}`}>Go to detail</Link> {/*Aca irira la ruta del detalle*/}
                </td>
              </tr>
            </tbody>
          ))}
      </table>
      <div>
        <h1>
          Page {current} of {totalPages}
        </h1>
        <button onClick={prevHandler}>Previous</button>
        <button onClick={nextHandler}>Next</button>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Paginated(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  function awaitOrders() {
    if (props.filteredOrders.length && props.filteredOrders[0].id) {
      setItems([...props.filteredOrders].splice(0, 10));
    } else {
      setItems([]);
    }
    setCurrentPage(0);
  }

  let totalPages = 1;

  if (props.filteredOrders.length && props.filteredOrders.length !== props.orders.length) {
    totalPages =
      Math.floor(props.filteredOrders.length / 10) !== 0
        ? Math.floor(props.filteredOrders.length / 10)+1

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
    <>
      {items &&
        (items.length ? (
          <>
            <ul className="products__list">
              {items.map(({ id, total_price, status, createdAt }) => (
                <li key={`Order_${id}`} className="products__list-item">
                  <button
                    className="btn"
                    onClick={() => {
                      navigate(`/orDetail/${id}`);
                    }}
                  >
                    Go to detail
                  </button>
                  <p>{`Date: ${createdAt && createdAt.slice(0, 10)}`}</p>
                  <p>{`Total: $${total_price}`}</p>
                  <p>{`Status: ${status}`}</p>
                  <p>{`ID: ${id}`}</p>
                </li>
              ))}
            <li className="orders__pagination">
              <button className="btn" onClick={prevHandler}>
                {"<"}
              </button>
              <p>
                Page {current} of {totalPages}
              </p>
              <button className="btn" onClick={nextHandler}>
                {">"}
              </button>
            </li>
            </ul>
          </>
        ) : (
          <h1 style={{ textAlign: "center" }}>No Orders to Show</h1>
        ))}
    </>
  );
}

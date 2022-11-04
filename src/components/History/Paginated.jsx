import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Paginated(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([]);

  function awaitOrders() {
    if (props.filteredOrders.length && props.filteredOrders[0].id) {
      setItems([...props.filteredOrders].splice(currentPage, 5));
    } else {
      setItems([])
    }
    setCurrentPage(0);
  }

  let totalPages =
    Math.floor(props.filteredOrders.length / 10) !== 0
      ? Math.floor(props.filteredOrders.length / 10) + 1
      : 1;

  const current = currentPage + 1 > totalPages ? 1 : currentPage + 1;

  function nextHandler() {
    const total = props.filteredOrders.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * 5;
    if (firstIndex >= total) return;
    setItems([...props.filteredOrders].splice(firstIndex, 5));
    console.log(items)
    setCurrentPage(nextPage);
  }

  function prevHandler() {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * 5;
    setItems([...props.filteredOrders].splice(firstIndex, 5));
    console.log(items)
    setCurrentPage(prevPage);
  }

  useEffect(() => {
    awaitOrders();
  }, [props.filteredOrders, props.orders]);

  return (
    <div>
      <div>
        <table className="user__table">
          <tbody>
            <tr>
              <th>Order Id</th>
              <th>Products</th>
              <th>Delivery Status</th>
              <th>Payment</th>
              <th>Payment Status</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Detail</th>
            </tr>
          </tbody>
          {items.length
            ? items.map((order, index) => (
              <tbody key={index}>
                <tr>
                  <td>{order.id}</td>
                  <td>
                    {order.products.length > 0
                      ? order.products.map((p) => {
                        return <Link to={`/products/${p.id}`}>
                          <p>{p.name}</p>
                        </Link>
                      })
                      : <p>No Products Info</p>
                    }
                  </td>
                  <td>{order.delivery.status}</td>
                  <td>{order.payment.type}</td>
                  <td>{order.payment.status}</td>
                  <td>{order.total_price}</td>
                  <td>{order.status}</td>
                  <td>
                    <Link to={`/orDetail/${order.id}`}>
                      <button className="btn primary">See Detail</button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))
            : ""
          }
        </table>
        {!items.length
          ? <h1>No Orders to Show</h1>
          : ""
        }
      </div>
      {items.length
        ? <div>
          <h1>
            Page {current} of {totalPages}
          </h1>
          <button className="btn" onClick={prevHandler}>Previous</button>
          <button className="btn" onClick={nextHandler}>Next</button>
        </div>
        : ""
      }
    </div>
  );
}

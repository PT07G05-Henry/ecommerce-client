import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./OrderDetail.css";

const OrderDetail = (props) => {
  const { id } = useParams();

  const [order, setOrder] = React.useState({});

  async function getOrder(id) {
    try {
      const orderDetail = await axios(
        `http://${
          process.env.REACT_APP_DEV_API || document.domain
        }/orders/${id}`
      );
      setOrder(orderDetail.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  React.useEffect(() => {
    getOrder(id);
  }, []);

  return (
    <div className="orderContainer">
      <h1>PURCHASE ORDER</h1>
      <div className="initialData">
        <div>
          <h4>Date of issue</h4>
          <h4>Order number</h4>
        </div>
        <div>
          <h4>{order.createdAt && order.createdAt.slice(0, 10)}</h4>
          <h4>{order.id}</h4>
        </div>
      </div>
      <div>
        <div>
          <h4>Customer's information</h4>
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Phone number</h4>
        </div>
        <div>
          <h4>
            {order.user && order.user.first_name},{" "}
            {order.user && order.user.last_name}
          </h4>
          <h4>{order.user && order.user.email}</h4>
          <h4>{order.delivery && order.delivery.phone_number}</h4>
        </div>
        <div>
          <h4>Ship info</h4>
          <h4>Type</h4>
          <h4>Shipping address</h4>
          <h4>Status</h4>
        </div>
        <div>
          <h4>{order.delivery && order.delivery.shipping_address}</h4>
          <h4>{order.delivery && order.delivery.type}</h4>
          <h4>{order.delivery && order.delivery.status}</h4>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Product id</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit price</th>
            <th>Total</th>
          </tr>
        </tbody>
        {order.products &&
          order.products.map((product, index) => (
            <tbody key={index}>
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.orders_products.product_quantity}</td>
                <td>${product.price}</td>
                <td>
                  ${product.price * product.orders_products.product_quantity}{" "}
                </td>
              </tr>
            </tbody>
          ))}
      </table>
      <h4>Subtotal: ${order.total_price}</h4>
      <div>
        <div>
          <h4>Payment</h4>
          <h4>payment method</h4>
          <h4>status</h4>
        </div>
        <div>
          <h4>{order.payment && order.payment.type}</h4>
          <h4>{order.payment && order.payment.status}</h4>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

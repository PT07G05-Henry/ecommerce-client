import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./OrderDetail.css";
import api, { endPoint } from "../../lib/api";

const OrderDetail = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [order, setOrder] = React.useState({});

  async function getOrder(id) {
    console.log("orderdetail");
    try {
      const orderDetail = await api.get(`${endPoint.orders}/${id}`);
      setOrder(orderDetail.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  React.useEffect(() => {
    getOrder(id);
  }, []);

  return (
    <div className="container oderDetails__container">
      <h1>PURCHASE ORDER</h1>
      <div className="initialData">
          <h2>Customer's information</h2>
          <div className="data_information">

        <div className="information">
          <h4>
            Name:  {` ${order.user && order.user.first_name},
             ${order.user && order.user.last_name}`}
          </h4>
          <h4>Email: {order.user && order.user.email}</h4>
          <h4>Phone number: {order.delivery && order.delivery.phone_number}</h4>
        </div>
        <div className="information">
          <h4>
            Date of issue: 
          </h4>
          <p>{order.createdAt && order.createdAt.slice(0, 10)}</p>
          <h4>Order number: </h4>
          <p>{order.id}</p>
        </div>
             </div>
      </div>

      <div className="shiping">
        <h2>Ship info</h2>
        <div className="shipping_info">

        <h4>Type: {order.delivery && order.delivery.type}</h4>
        <h4>
          Shipping address: {order.delivery && order.delivery.shipping_address}
        </h4>
        <h4>Status: {order.delivery && order.delivery.status}</h4>
        </div>
      </div>
      <ul className="products__list">
        {order.products &&
          order.products.map((product, index) => (
            <li key={index} className="products__list-item">
              <p>
                {`Total Price: $${(
                  product.price * product.orders_products.product_quantity
                ).toFixed(2)}`}
              </p>
              <p>{`Unitary Price: $${product.price}`}</p>
              <p>{`Qty: ${product.orders_products.product_quantity}`}</p>
              <p>{`Name: ${product.name}`}</p>
              <p>{`ID: ${product.id}`}</p>
            </li>
          ))}
      <div className="payment">
        <h2>Payment</h2>
        <div className="payment_total">

        <h4>payment method: {order.payment && order.payment.type}</h4>
        <h4>status: {order.payment && order.payment.status}</h4>
      <h4>Subtotal: ${order.total_price}</h4>
        </div>
      </div>
      </ul>
    </div>
  );
};

export default OrderDetail;

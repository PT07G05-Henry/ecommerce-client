import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, selectOrders } from "../../store/api";
import SortButton from "./SortButton";
import Paginated from "./Paginated";

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const [filteredOrders, setFilteredOrders] = useState([]);

  function handleChange(e) {
    const value = e.target.value;

    if (value === "All") {
      return setFilteredOrders(orders);
    }
    setFilteredOrders(orders.filter((order) => order.status === value));
  }

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <>
      <div>
        <SortButton
          filteredOrders={filteredOrders}
          setFilteredOrders={setFilteredOrders}
        />
        <select onChange={handleChange}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Billed">Billed</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Rejected">Rejected</option>
        </select>
        <Paginated
          filteredOrders={filteredOrders}
          setFilteredOrders={setFilteredOrders}
          orders={orders}
        />
      </div>
    </>
  );
}

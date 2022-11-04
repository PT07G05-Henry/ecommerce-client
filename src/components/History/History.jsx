import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginated from "./Paginated.jsx";
import { getOrders, selectOrders } from "../../store/api";

export default function History() {
  const dispatch = useDispatch();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const orders = useSelector(selectOrders);

  function handleChange(e) {
    const value = e.target.value;
    if(value === "All"){
      setFilteredOrders(orders)
    } else {
      const filtered = orders.filter(o => o.status === value);
      setFilteredOrders(filtered)
    }
  }

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])
  
  useEffect(() => {
    setFilteredOrders(orders)
  },[orders])

  return (
    <>
      <div>
        <select onChange={handleChange}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Billed">Billed</option>
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
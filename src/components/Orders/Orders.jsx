import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, selectOrders } from "../../store/api";
import { Link } from "react-router-dom";

export default function Orders() {

  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const [filteredOrders, setFilteredOrders] = React.useState(orders);
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([]);
  let toggle = {
    value: true,
    order:true
  }

  const totalPages = Math.floor(filteredOrders.length / 10) !== 0 ?
    Math.floor(orders.length / 10) + 1 : 1;

  const current = (currentPage + 1) > totalPages ? 
    1 : currentPage + 1;

  function nextHandler() {
    const total = filteredOrders.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage + 1;
    if(firstIndex >= total) return;
    setItems([...filteredOrders].splice(firstIndex, 10));
    setCurrentPage(nextPage);
  };
  
  function prevHandler() {
    const prevPage = currentPage - 1;
    if(prevPage < 0) return;
    const firstIndex = prevPage * 10;
    setItems([...filteredOrders].splice(firstIndex, 8));
    setCurrentPage(prevPage);
  };

  function handleClick() {
    console.log('click')
    if(toggle) {
      setFilteredOrders( filteredOrders.sort (
        function (a, b) {
            if (new Date(a.createdAt.slice(0, 10)) > new Date(b.createdAt.slice(0, 10))) return 1;
            if (new Date(a.createdAt.slice(0, 10)) < new Date(b.createdAt.slice(0, 10))) return -1;
            return 0;
        }))
        toggle = false;
    } else {
      setFilteredOrders( filteredOrders.sort (
        function (a, b) {
            if (new Date(a.createdAt.slice(0, 10)) < new Date(b.createdAt.slice(0, 10))) return 1;
            if (new Date(a.createdAt.slice(0, 10)) > new Date(b.createdAt.slice(0, 10))) return -1;
            return 0;
        }))
        setItems([...filteredOrders].splice((0, 10)))
        toggle = true;
    }
  } 

  function handleChange(e) {
    const value = e.target.value;
    
    if(value === 'All') return setFilteredOrders(orders);
    setFilteredOrders(orders.filter( order => order.status === value));
  }

  useEffect(() => {
    dispatch(getOrders()); 
  }, [dispatch]);
  
  return ( 
    <>
      <div>
          <button onClick={ handleClick }>Date</button>
          <div>
            <h1>Page {current} of {totalPages}</h1>
            <button onClick={ prevHandler }>Forward</button>
            <button onClick={ nextHandler }>Next</button>
          </div>
          <select onChange= { handleChange }>
            <option value='All'>All</option>
            <option value='Pending'>Pending</option>
            <option value='Accepted'>Accepted</option>
            <option value='Billed'>Billed</option>
            <option value='Dispatched'>Dispatched</option>
            <option value='Rejected'>Rejected</option>as
          </select>
          { items.length ? items && items.map((order, index) => 
            <Link to={`/orDetail/${order.id}`}>
              <h3 key = {index}> Order number: { order.id } --- status: { order.status } --- Price: ${order.total_price} --- Date: { order.createdAt && order.createdAt.slice(0, 10) } </h3>
            </Link>
          ) : orders && orders.map((order, index) => 
          <Link to={`/orDetail/${order.id}`}>
            <h3 key = {index}> Order number: { order.id } --- status: { order.status } --- Price: ${order.total_price} --- Date: { order.createdAt && order.createdAt.slice(0, 10) } </h3>
          </Link>
        )  }
      </div>
    </>     
  );
}
import React from "react";

export default function SortButton(props) {
  let toggle = true;

  function handleClick() {
    let sortedOrders = [];
    if (toggle) {
      sortedOrders = [...props.filteredOrders].sort(function (a, b) {
        if (
          new Date(a.createdAt.slice(0, 10)) >
          new Date(b.createdAt.slice(0, 10))
        )
          return 1;
        if (
          new Date(a.createdAt.slice(0, 10)) <
          new Date(b.createdAt.slice(0, 10))
        )
          return -1;
        return 0;
      });
      toggle = false;
    } else {
      sortedOrders = [...props.filteredOrders].sort(function (a, b) {
        if (
          new Date(a.createdAt.slice(0, 10)) <
          new Date(b.createdAt.slice(0, 10))
        )
          return 1;
        if (
          new Date(a.createdAt.slice(0, 10)) >
          new Date(b.createdAt.slice(0, 10))
        )
          return -1;
        return 0;
      });
      props.setFilteredOrders(sortedOrders);
      toggle = true;
    }
  }

  return <button className="btn" onClick={handleClick}>Date</button>;
}

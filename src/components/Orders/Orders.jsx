import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, selectAllOrders } from "../../store/allOrders";
import SortButton from "./SortButton";
import Paginated from "./Paginated";
import { Doughnut, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const [filteredOrders, setFilteredOrders] = useState([]);

  function handleChange(e) {
    const value = e.target.value;

    if (value === "ALL") {
      return setFilteredOrders(orders);
    }
    setFilteredOrders(orders.filter((order) => order.status === value));
  }

  function countOrders(orders) {
    let data = {
      approvedOrders: 0,
      pendingdOrders: 0,
      rejectedOrders: 0,
      cancelledOrders: 0,
      authorizedOrders: 0
    }

    orders.map((o) => {
      switch (o.status) {
        case 'APPROVED':
          return data.approvedOrders++
        case 'PENDING':
          return data.rejectedOrders++
        case 'REJECTED':
          return data.pendingdOrders++
        case 'CANCELLED':
          return data.cancelledOrders++
        case 'AUTHORIZED':
          return data.authorizedOrders++
        default:
          return ''
      }
    })
    return data;
  }

  let valuesOrders = {
    approvedOrders: 0,
    rejectedOrders: 0,
    cancelledOrders: 0,
    authorizedOrders: 0,
    pendingdOrders: 0
  }
  let valuesUser = [
    { user: '', total: 0 },
    { user: '', total: 0 },
    { user: '', total: 0 },
    { user: '', total: 0 },
    { user: '', total: 0 }
  ];

  if (orders && orders[0].id) {
    valuesOrders = countOrders(orders)
    valuesUser = countUsers(orders)
  }

  let dataOrders = {
    labels: ['APPROVED', 'PENDING', 'REJECTED', 'CANCELLED', 'AUTHORIZED'],
    datasets: [{
      label: 'Total Orders',
      data: [
        valuesOrders.approvedOrders,
        valuesOrders.rejectedOrders,
        valuesOrders.cancelledOrders,
        valuesOrders.authorizedOrders,
        valuesOrders.pendingdOrders
      ],
      backgroundColor: [
        'rgba(75, 192, 192, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1
    }]
  }

  function countUsers(orders) {
    let data = []
    orders.map((o) => {
      let user = o.user.email
      let userId = o.user.id
      if (o.status === 'APPROVED') {
        if (Object.hasOwn(data, userId)) {
          data[userId].total = data[userId].total + o.total_price
        }
        else {
          data[userId] = {
            user: user,
            total: o.total_price
          }
        }
      }
    })
    data.sort(((a, b) => b.total - a.total));
    //For en caso de que no se completen los 5 necesarios para el grafico se completa con 0 para que no rompa
    for (let i = 0; i < 5; i++) {
      if(!data[i]) {
        data[i] = {
          user: 'No information',
          total: 0
        }
      }   
    }
    return data;
  }

  let dataUsers = {
    labels: [
      valuesUser[0].user,
      valuesUser[1].user,
      valuesUser[2].user,
      valuesUser[3].user,
      valuesUser[4].user
    ],
    datasets: [
      {
        label: 'Total Orders Price',
        data: [
          valuesUser[0].total,
          valuesUser[1].total,
          valuesUser[2].total,
          valuesUser[3].total,
          valuesUser[4].total
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)'
      },
    ],
  };

  let options = {
    responsive: true
  }

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    setFilteredOrders(orders)
  },[orders])

  return (
    <>
      <div>
        <SortButton
          filteredOrders={filteredOrders}
          setFilteredOrders={setFilteredOrders}
        />
        <select onChange={handleChange}>
          <option value="ALL">ALL</option>
          <option value="CANCELLED">CANCELLED</option>
          <option value="REJECTED">REJECTED</option>
          <option value="PENDING">PENDING</option>
          <option value="APPROVED">APPROVED</option>
          <option value="AUTHORIZED">AUTHORIZED</option>
        </select>
        <Paginated
          filteredOrders={filteredOrders}
          setFilteredOrders={setFilteredOrders}
          orders={orders}
        />
        <div>
          Total Orders: {orders.length}
          <Doughnut
            data={dataOrders}
            options={options}
          />
        </div>
        <div>
          Top 5 Buyers
          <Bar
            data={dataUsers}
            options={options}
          />
        </div>
      </div>
    </>
  );
}

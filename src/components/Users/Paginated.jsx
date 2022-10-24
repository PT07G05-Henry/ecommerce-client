import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Paginated(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([]);

  function awaitUsers() {
    if (props.filteredUsers.length && props.filteredUsers[0].id) {
      setItems([...props.filteredUsers].splice(currentPage, 10));
    } else {
        props.setFilteredUsers(props.users)
    }
    setCurrentPage(0);
  }

  let totalPages =
    Math.floor(props.filteredUsers.length / 10) !== 0
      ? Math.floor(props.filteredUsers.length / 10) + 1
      : 1;

  const current = currentPage + 1 > totalPages ? 1 : currentPage + 1;

  function nextHandler() {
    const total = props.filteredUsers.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * 10;
    if (firstIndex >= total) return;
    setItems([...props.filteredUsers].splice(firstIndex, 10));
    console.log(items)
    setCurrentPage(nextPage);
  }

  function prevHandler() {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * 10;
    setItems([...props.filteredUsers].splice(firstIndex, 10));
    console.log(items)
    setCurrentPage(prevPage);
  }

  function handleClick(e) {
    const id = e.target.value;
    axios
      .delete(
        `http://${
          process.env.REACT_APP_DEV_API || document.domain
        }/users?id=${id}`
      )
      .then(alert("User deleted successfully"))
      .catch((err) => err.message);
    props.setFilteredUsers(
      props.filteredUsers.filter((user) => user.id !== parseInt(id))
    );
  }

  useEffect(() => {
    awaitUsers();
  }, [props.filteredUsers, props.users]);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>User number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Delete</th>
          </tr>
        </tbody>
        {items &&
          items.map((user, index) => (
            <tbody key={index}>
              <tr>
                <td>{user.id}</td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.email}</td>
                <td>{user.rols && user.rols.length && user.rols[0].type}</td>
                <td>
                  {user.id && (
                    <button value={user.id} onClick={handleClick}>
                      X
                    </button>
                  )}
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
}

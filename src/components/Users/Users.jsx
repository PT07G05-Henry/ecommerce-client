import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUser } from "../../store/api";
import axios from "axios";

export default function Users() {
  const dispatch = useDispatch();

  const users = useSelector(selectUser);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function handleChange(e) {
    const value = e.target.value;
    if (value === "All") {
      return setFilteredUsers(users);
    }
    setFilteredUsers(
      users.filter((user) => user.rols && user.rols[0].type === value)
    );
  }

  setTimeout(() => {
    if (!filteredUsers.length) {
      setFilteredUsers(users);
    }
  }, 3000);

  function handleClick(e) {
    console.log(e.target.value);
    axios
      .delete(
        `http://${process.env.REACT_APP_DEV_API || document.domain}/users`,
        e.target.value
      )
      .then(alert("User deleted successfully"))
      .catch((err) => alert(e.response.data));
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <div>
        <select onChange={handleChange}>
          <option value="All">All</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
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
          {filteredUsers &&
            filteredUsers.map((user, index) => (
              <tbody key={index}>
                <tr>
                  <td>{user.id}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.rols && user.rols[0].type}</td>
                  <td>
                    <button value={user.email} onClick={handleClick}>
                      X
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </>
  );
}

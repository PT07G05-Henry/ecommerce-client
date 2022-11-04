import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUser } from "../../store/api";
import Paginated from "../Paginated/Paginated.jsx";
import "./users.css";
import api, { endPoint } from "../../lib/api";
export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector(selectUser);
  const [filteredUsers, setFilteredUsers] = useState("All");

  function handleChange(e) {
    const value = e.target.value;
    setFilteredUsers(value);
  }

  useEffect(() => {
    console.log(users);
    dispatch(
      getUsers({
        rol: filteredUsers,
      })
    );
  }, [dispatch, filteredUsers]);

  function changeRol(id, rol) {
    api.put(`${endPoint.users}/${id}`, {data: rol})
    .then((res) => {
      alert('Successfully Changed Role')
      dispatch(
        getUsers({
          rol: filteredUsers,
        })
      );
    });
  }

  function handlerRolSwitch(id, rol) {
    console.log(id, rol)
    if(rol === 'Superadmin') {
      alert('Role SUPERADMIN cannot be changed')
    } else {
      try {
        rol === 'Admin' 
        ? changeRol(id, {rol: 2}) //Id de roles en DB 1-Admin, 2-User, 3-Superadmin
        : changeRol(id, {rol: 1})
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  function handleClick(e) {
    const id = e.target.value;
    api.delete(endPoint.users, {params: {id:id}})
      .then(alert("User deleted successfully"))
      .catch((err) => err.message);
    setFilteredUsers(
      filteredUsers.filter((user) => user.id !== parseInt(id))
    );
  }

  return (
    <>
      <div>
        <select onChange={handleChange}>
          <option value="All">All</option>
          <option value="Superadmin">Superadmin</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <Paginated
          filteredUsers={filteredUsers}
          setFilteredUsers={setFilteredUsers}
          data={users}
          dispatch={(flags) => {
            dispatch(getUsers(flags));
          }}
        />
        <div>
          <table className="user__table">
            <tbody>
              <tr>
                <th>User number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Change Rol</th>
                <th>Delete</th>
              </tr>
            </tbody>
            {users &&
              users.results?.map((user, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{user.id}</td>
                    <td>
                      {user.first_name} {user.last_name}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      {user.rols[0].type}
                    </td>
                    <td>
                      <button className="btn"
                        onClick={() => {
                          handlerRolSwitch(user.id, user.rols[0].type);
                        }}
                      >
                        Change Rol
                      </button>
                    </td>
                    <td>
                      {user.id && (
                        <button className="btn" value={user.id} onClick={handleClick}>
                        X
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </>
  );
}

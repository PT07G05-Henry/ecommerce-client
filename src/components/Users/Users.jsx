import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUser } from "../../store/users";
import Paginated from "../Paginated/Paginated.jsx";
import "./users.css";
import api, { endPoint } from "../../lib/api";
import Loading from "../loading/Loading";
import ProtectedFrom from "../protectedFrom/ProtectedFrom";

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector(selectUser);
  const [filteredUsers, setFilteredUsers] = useState("All");

  useEffect(() => {
    users &&
      (users.toBeField || users.error) &&
      dispatch(
        getUsers({
          rol: filteredUsers,
          page: 1,
        })
      );
  }, [users]);

  const handleChange = ({ target }) => setFilteredUsers(target.value);

  useEffect(() => {
    console.log(users);
    dispatch(
      getUsers({
        rol: filteredUsers,
        page: 1,
      })
    );
  }, [filteredUsers]);

  function changeRol(id, rol) {
    api.put(`${endPoint.users}/${id}`, { data: rol }).then((res) => {
      alert("Successfully Changed Role");
      dispatch(
        getUsers({
          rol: filteredUsers,
        })
      );
    });
  }

  function handlerRolSwitch(id, rol) {
    if (rol === "Superadmin") {
      alert("Role SUPERADMIN cannot be changed");
    } else {
      try {
        rol === "Admin"
          ? changeRol(id, { rol: 2 }) //Id de roles en DB 1-Admin, 2-User, 3-Superadmin
          : changeRol(id, { rol: 1 });
      } catch (err) {
        console.err(err.message);
      }
    }
  }

  function handlerSuperadminSwitch(id, rol) {
    try {
      rol === "Superadmin"
        ? changeRol(id, { rol: 1 }) //Id de roles en DB 1-Admin, 2-User, 3-Superadmin
        : changeRol(id, { rol: 3 });
    } catch (err) {
      console.err(err.message);
    }
  }

  function handleClick(e) {
    const id = e.target.value;
    api
      .delete(endPoint.users, { params: { id: id } })
      .then(alert("User deleted successfully"))
      .catch((err) => err.message);
    setFilteredUsers(filteredUsers.filter((user) => user.id !== parseInt(id)));
  }

  return users.results ? (
    <>
      <Paginated
        data={users}
        dispatch={(flags) => {
          console.log(flags);
          dispatch(getUsers(flags));
        }}
      />
      <div className="users__filters">
        <select value={filteredUsers} onChange={handleChange}>
          <option className="users__filter-option" value="All">
            All
          </option>
          <option className="users__filter-option" value="Superadmin">
            Superadmin
          </option>
          <option className="users__filter-option" value="Admin">
            Admin
          </option>
          <option className="users__filter-option" value="User">
            User
          </option>
        </select>
      </div>
      <ul className="products__list">
        {users.results?.map((user) => {
          return (
            <li key={`User_${user.id}`} className="products__list-item">
              <button className="btn" value={user.id} onClick={handleClick}>
                Delete
              </button>
              {user.rols.length && (
                <ProtectedFrom Guest User Admin noRender>
                  <button
                    className="btn"
                    onClick={() => {
                      handlerSuperadminSwitch(user.id, user.rols[0].type);
                    }}
                  >
                    {`Switch to ${
                      user.rols[0].id < 3 ? "Superadmin" : "Admin"
                    }`}
                  </button>
                </ProtectedFrom>
              )}
              {user.rols.length && user.rols[0].id < 3 && (
                <button
                  className="btn"
                  onClick={() => {
                    handlerRolSwitch(user.id, user.rols[0].type);
                  }}
                >
                  {`Switch to ${user.rols[0].id === 1 ? "User" : "Admin"}`}
                </button>
              )}
              {user.rols.length && <p>{`Rol: ${user.rols[0].type}`}</p>}
              <p>{`Email: ${user.email}`}</p>
              <p>{`Name: ${user.first_name} ${user.last_name}`}</p>
              <p>{`ID:${user.id}`}</p>
            </li>
          );
        })}
      </ul>
    </>
  ) : (
    <Loading />
  );
}

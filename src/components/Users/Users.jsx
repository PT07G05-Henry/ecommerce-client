import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUser } from "../../store/users";
import { selectThisUserId } from "../../store/thisUser";
import Paginated from "../Paginated/Paginated.jsx";
import "./users.css";
import api, { endPoint, query } from "../../lib/api";
import Loading from "../loading/Loading";
import ProtectedFrom from "../protectedFrom/ProtectedFrom";
import { NAME } from "../../store/api";

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector(selectUser);
  const [filteredUsers, setFilteredUsers] = useState("All");
  const [name, setName] = useState("");
  const userId = useSelector(selectThisUserId);

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
    let query = {
      rol: filteredUsers,
      page: 1,
    };
    name.length && (query[NAME] = name);
    dispatch(getUsers(query));
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
    const id = Number(e.target.value);
    if(userId === id) {
      return alert("Can't delete your own user")
    }
    if(window.confirm("Are you sure you want to delete this user?")) {
      api
      .delete(endPoint.users, { params: { id: id } })
      .then((res) => {
        alert("User deleted successfully")
        dispatch(
          getUsers({
            rol: filteredUsers,
            page: 1,
          })
        )
      })
      .catch((err) => err.message);
      }
  }

  return users.results ? (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let query = {
            rol: filteredUsers,
            page: 1,
          };
          name.length && (query[NAME] = name);
          dispatch(getUsers(query));
          setName("");
        }}
        className="products__searchByName"
      >
        <div className="products__searchByName-search">
          <input
            value={name}
            onChange={({ target }) => {
              setName(target.value);
            }}
            type="text"
            className="products__searchByName"
            placeholder="Filter by name"
          />
          <button type="submit" className="btn">
            Search
          </button>
        </div>
        {users.query.name && (
          <div className="products__searchByName-active">
            <label>{`Filtering by "${users.query.name}" on name`}</label>
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch(getUsers());
              }}
            >
              Back to view all
            </button>
          </div>
        )}
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
      </form>
      {users.results.length ? (
        <>
          <Paginated
            data={users}
            dispatch={(flags) => {
              dispatch(getUsers(flags));
            }}
          />
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
        <h1 style={{ textAlign: "center" }}>{`No products found`}</h1>
      )}
    </>
  ) : (
    <Loading />
  );
}

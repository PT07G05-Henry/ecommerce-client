import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUser } from "../../store/api";
import Paginated from "../Paginated/Paginated.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import "./users.css";
export default function Users() {
  const dispatch = useDispatch();
  const { getIdTokenClaims } = useAuth0();
  const users = useSelector(selectUser);
  const [filteredUsers, setFilteredUsers] = useState("All");

  function handleChange(e) {
    const value = e.target.value;
    setFilteredUsers(value);
  }

  useEffect(() => {
    console.log(users);
    getIdTokenClaims()
      .then((r) => r.sid)
      .then((sid) => {
        dispatch(
          getUsers({
            rol: filteredUsers,
            sid,
          })
        );
      });
  }, [dispatch, filteredUsers]);

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
                      {user.rols && user.rols.length === 3
                        ? "Superadmin"
                        : user.rols[0].type}
                    </td>
                    <td>
                      {user.id && (
                        <button
                          className="btn"
                          value={user.id}
                          onClick={() => {}}
                        >
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

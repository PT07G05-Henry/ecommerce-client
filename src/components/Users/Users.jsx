import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUser } from "../../store/api";
import Paginated from "../Paginated/Paginated.jsx";
import "./users.css"
export default function Users() {
  const dispatch = useDispatch();

  const users = useSelector(selectUser);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function handleChange(e) {
    const value = e.target.value;
    if (value === "All") {
      return setFilteredUsers(users);
    }
    console.log(filteredUsers, "filtro");
    setFilteredUsers(
      users.filter((user) => user.rols && user.rols[0].type === value)
    );
  }

  // setTimeout(() => {
  //   console.log(filteredUsers, 'setTime')
  //   if (!filteredUsers.length) {
  //     setFilteredUsers(users);
  //   }
  // }, 5000);

  useEffect(() => {
    console.log(users);
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <div>
        {/* <SearchBar
          setFilteredUsers={setFilteredUsers}
        /> */}
        <select onChange={handleChange}>
          <option value="All">All</option>
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
                      {user.rols &&
                        user.rols.length === 3 ? "Superadmin" : user.rols.length === 2 ? "Admin" : "User"
                        }
                    </td>
                    <td>
                      {user.id && (
                        <button className="btn" value={user.id} onClick={() => {}}>
                          X
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
        {/* {users && users.results?.map(()=>{

        })} */}
      </div>
    </>
  );
}

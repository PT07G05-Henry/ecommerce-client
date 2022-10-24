import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUser } from "../../store/api";
import Paginated from "./Paginated";
//import SearchBar from "./SearchBar";

export default function Users() {
  const dispatch = useDispatch();

  const users = useSelector(selectUser);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function handleChange(e) {
    const value = e.target.value;
    if (value === "All") {
      return setFilteredUsers(users);
    }
    console.log(filteredUsers, 'filtro')
    setFilteredUsers(
      users.filter((user) => user.rols && user.rols[0].type === value)
    );
  };

  // setTimeout(() => {
  //   console.log(filteredUsers, 'setTime')
  //   if (!filteredUsers.length) {
  //     setFilteredUsers(users);
  //   }
  // }, 5000);

  useEffect(() => {
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
          users={users}
        />
      </div>
    </>
  );
}

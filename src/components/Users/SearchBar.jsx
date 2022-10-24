import React from "react";
import { getUsers, selectUser } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
//import './SearchBar.css'

export default function SearchBar(props) {
  const [email, setEmail] = React.useState("");
  const [resultsFor, setResultsFor] = React.useState("");
  const dispatch = useDispatch();
  const users = useSelector(selectUser);

  function handleChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit() {
    dispatch(getUsers(email));
    console.log('users', users)
    setEmail("");
    users.length && props.setFilteredUsers(users);
    setResultsFor(email);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search by email..."
        value={email}
        onChange={handleChange}
      />
      <div className="search">
        <button type="submit" onClick={handleSubmit}>
          SEARCH
        </button>
        {resultsFor && <h4>Results for {resultsFor}</h4>}
      </div>
    </form>
  );
}

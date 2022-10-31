import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersById } from "../../store/userById";
import { selectThisUser } from "../../store/thisUser";
import { updateUsers } from "../../store/users";
import { useAuth0 } from "@auth0/auth0-react";
import validate from "./validate";
import './Profile.css';


export default function Profile({ userId }) {
  const dispatch = useDispatch();
  const userData = useSelector(selectThisUser);
  const { getIdTokenClaims } = useAuth0();

  const [update, setUpdate] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    profile_picture: "",
    password: "",
  });

  const [error, setError] = useState({});

  const [input, setInput] = useState({
    id: userData.userDb.id,
  });

  const [inputHidden, setInputHidden] = useState({
    first_name: "hidden",
    last_name: "hidden",
    birth_date: "hidden",
    profile_picture: "hidden",
    password: "hidden",
    edit: "hidden",
    button: "show",
    submit: "hidden",
  });

  const handleHidden = (e) => {
    e.preventDefault();
    if (e.target.value === "edit") {
      setInputHidden({
        ...inputHidden,
        button: "hidden",
        submit: "show",
        edit: "show",
      });
    } else {
      setInputHidden({
        ...inputHidden,
        [e.target.value]: "show",
      });
    }
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getIdTokenClaims()
      .then((r) => r.sid)
      .then((sid) => {
        if (
          !input.first_name &&
          !input.last_name &&
          !input.birth_date &&
          !input.profile_picture &&
          !input.password
        )
          return alert("No values ​​to update");
        setInputHidden({
          first_name: "hidden",
          last_name: "hidden",
          birth_date: "hidden",
          profile_picture: "hidden",
          password: "hidden",
          edit: "hidden",
          button: "show",
          submit: "hidden",
        });
        dispatch(updateUsers({ input, sid, setUpdate }));
      });
    setInput({
      id: userData.userDb.id,
    });
  };

  useEffect(() => {
    !userData && dispatch(getUsersById(userId));
  }, []);

  useEffect(() => {}, [userData]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Profile Image: </label>
          <img className='profPic' src={userData.userDb.profile_picture} alt="Profile" />
          <div className={inputHidden.edit}>
            <input
              className={inputHidden.profile_picture}
              type="text"
              name="profile_picture"
              id="pic"
              value={input.profile_picture}
              onChange={handleInputChange}
            />
            <button value="profile_picture" onClick={handleHidden}>
              Change
            </button>
          </div>
        </div>
        <div>
          <label>First Name: {userData.userDb.first_name}</label>
        </div>
        <div className={inputHidden.edit}>
          <input
            className={inputHidden.first_name}
            type="text"
            name="first_name"
            id="name"
            value={input.first_name}
            onChange={handleInputChange}
          />
           <p className="errorAlert__errorMessage">{error.first_name}</p>
          <button value="first_name" onClick={handleHidden}>
            Edit
          </button>
        </div>
        <div>
          <label>
            Last Name: {userData.userDb.last_name && userData.userDb.last_name}
          </label>
          <div className={inputHidden.edit}>
            <input
              className={inputHidden.last_name}
              type="text"
              name="last_name"
              id="last_name"
              value={input.last_name}
              onChange={handleInputChange}
            />
            <p className="errorAlert__errorMessage">{error.last_name}</p>
            <button value="last_name" onClick={handleHidden}>
              Edit
            </button>
          </div>
        </div>
        <div>
          <label>
            Birth Date:{" "}
            {userData.userDb.birth_date && userData.userDb.birth_date}
          </label>
          <div className={inputHidden.edit}>
            <input
              className={inputHidden.birth_date}
              type="date"
              name="birth_date"
              id="birth_date"
              value={input.birth_date}
              onChange={handleInputChange}
            />
            <p className="errorAlert__errorMessage">{error.birth_date}</p>
            <button value="birth_date" onClick={handleHidden}>
              Edit
            </button>
          </div>
        </div>
        <div>
          <label>Email: {userData.userDb.email}</label>
        </div>
        <button
          className={inputHidden.button}
          value="edit"
          onClick={handleHidden}
        >
          Edit Profile
        </button>
        <input className={inputHidden.submit} type="submit" value="submit" />
      </form>
    </>
  );
}

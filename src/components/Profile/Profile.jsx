import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersById, selectUserById } from "../../store/userById";
import { selectThisUser } from "../../store/thisUser";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import validate from "./validate";
import "./Profile.css";

export default function Profile({ userId }) {
  const dispatch = useDispatch();
  
  let userData = useSelector(selectThisUser);
  const { getIdTokenClaims } = useAuth0();
  const user = useSelector(selectUserById);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    id: userData.userDb.id,
  });
  const [inputHidden, setInputHidden] = useState({
    first_name: "hidden",
    last_name: "hidden",
    birth_date: "hidden",
    profile_picture: "hidden",
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
          !input.profile_picture
        )
          return alert("No values ​​to update");
        if (
          error.first_name ||
          error.last_name ||
          error.birth_date ||
          error.profile_picture
        )
          return alert("Error in any of the fields");
        try {
          axios
            .put(
              `https://${
                process.env.REACT_APP_DEV_API || document.domain
              }/users?sid=${sid}`,
              input
            )
            .then(() => {
              alert("Your profile was updated successfully");
            });
        } catch (error) {
          alert("Error: " + error.message);
          console.error(error);
        }
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
      });
    setInput({
      id: userData.userDb.id,
    });
    setTimeout(() => {
      dispatch(getUsersById(userId));
    }, 2000);
  };

  useEffect(() => {
    !userData && dispatch(getUsersById(userId));
  }, []);

  useEffect(() => {}, [userData]);

  return (
    <div>
      <div>
        <form className="pi" onSubmit={handleSubmit}>
          <div className="pi">
            <label className="pi">Profile Image: </label>
            <img
              className="profPic"
              src={
                user.profile_picture
                  ? user.profile_picture
                  : userData.userDb.profile_picture
              }
              alt="Profile"
            />
          </div>

          <div className={inputHidden.edit}>
            <div className="pi">
              
                <input
                  className={`pi input ${inputHidden.profile_picture}`}
                  type="text"
                  name="profile_picture"
                  id="pic"
                  value={input.profile_picture}
                  onChange={handleInputChange}
                />
              

              <button
                className="pi btn"
                value="profile_picture"
                onClick={handleHidden}
              >
                Change
              </button>
            </div>
          </div>
          <div className="pi">
            <label>
              First Name:{" "}
              {user.first_name ? user.first_name : userData.userDb.first_name}
            </label>
          </div>
            <div className={inputHidden.edit}>
          <div className="pi">
              <input
                className={`pi input ${inputHidden.first_name}`}
                type="text"
                name="first_name"
                id="name"
                value={input.first_name}
                onChange={handleInputChange}
              />
              <p className="errorAlert__errorMessage">{error.first_name}</p>
              <button className="btn" value="first_name" onClick={handleHidden}>
                Edit
              </button>
            </div>
          </div>
          <div className="pi">
            <label>
              Last Name:{" "}
              {user.last_name
                ? user.last_name
                : userData.userDb.last_name && userData.userDb.last_name}
            </label>
              <div className={inputHidden.edit}>
            <div className="pi">
                <input
                  className={`pi input ${inputHidden.last_name}`}
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={input.last_name}
                  onChange={handleInputChange}
                />
                <p className="errorAlert__errorMessage">{error.last_name}</p>
                <button
                  className="btn"
                  value="last_name"
                  onClick={handleHidden}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className="pi">
            <label>
              Birth Date:{" "}
              {user.birth_date
                ? user.birth_date
                : userData.userDb.birth_date && userData.userDb.birth_date}
            </label>
              <div className={inputHidden.edit}>
            <div className="pi">
                <input
                  className={`pi input ${inputHidden.birth_date}`}
                  type="date"
                  name="birth_date"
                  id="birth_date"
                  value={input.birth_date}
                  onChange={handleInputChange}
                />
                <p className="errorAlert__errorMessage">{error.birth_date}</p>
                <button
                  className="btn"
                  value="birth_date"
                  onClick={handleHidden}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className="pi">
            <label>Email: {userData.userDb.email}</label>
          </div>
          <button
            className={`btn ${inputHidden.button}`}
            value="edit"
            onClick={handleHidden}
          >
            Edit Profile
          </button>
          <input
            className={`btn ${inputHidden.submit}`}
            type="submit"
            value="submit"
          />
        </form>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersById } from "../../store/userById";
import { selectThisUser } from "../../store/thisUser";
import { updateUsers } from "../../store/users";
import { useAuth0 } from "@auth0/auth0-react";

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

  const [input, setInput] = useState({
    id: userData.userDb.id,
  });

  console.log(userData)

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
    } else if (e.target.value === "submit") {
      setInputHidden({
        ...inputHidden,
        button: "show",
        submit: "hidden",
        edit: "hidden",
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

    // setError(
    //     validate({
    //         ...input,
    //         [e.target.name]: e.target.value,
    //     })
    // );
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
          <img src={userData.userDb.profile_picture} alt="Profile" />
          {/* <input value="Change Image"></input> */}
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
          <button value="first_name" onClick={handleHidden}>
            Edit
          </button>
        </div>
        <div>
          <label>
            Last Name: {userData.userDb.last_name && userData.userDb.last_name}
          </label>
          {/* {!userData.userDb.last_name && <input value="update"></input>} */}
          <div className={inputHidden.edit}>
            <input
              className={inputHidden.last_name}
              type="text"
              name="last_name"
              id="last_name"
              value={input.last_name}
              onChange={handleInputChange}
            />
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
          {/* {!userData.userDb.birth_date && (
            <input value="add birth_date"></input>
          )} */}
          <div className={inputHidden.edit}>
            <input
              className={inputHidden.birth_date}
              type="date"
              name="birth_date"
              id="name"
              value={input.birth_date}
              onChange={handleInputChange}
            />
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
        <input
          className={inputHidden.submit}
          type="submit"
          value="submit"
        />
      </form>
    </>
  );
}

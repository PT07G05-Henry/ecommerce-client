import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersById, selectUserById } from "../../store/userById";
import { selectThisUser } from "../../store/thisUser";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import validate from "./validate";
import "./Profile.css";
import api, { endPoint } from "../../lib/api";
import users from "../../store/users";

export default function Profile({ userId }) {
  const ref = React.useRef();
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
    let formData = new FormData();
    Object.keys(input).forEach((key) => {
      formData.append(key, input[key]);
    });
    console.log(Object.keys(input), "keys");
    formData.append(
      "profile_picture",
      ref.current.files[0],
      ref.current.files[0].name
    );
    console.log("form ", formData.entries());
    console.log(ref.current.files);
    api
      .put(endPoint.users, {
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          dispatch(getUsersById(userId));
        }, 2000);
      })
      .catch((error) => console.error(error));

    // getIdTokenClaims()
    //   .then((r) => r.sid)
    //   .then((sid) => {
    //     if (
    //       !input.first_name &&
    //       !input.last_name &&
    //       !input.birth_date &&
    //       !input.profile_picture
    //     )
    //       return alert("No values ​​to update");
    //     if(
    //       error.first_name ||
    //       error.last_name ||
    //       error.birth_date ||
    //       error.profile_picture
    //     )
    //       return alert("Error in any of the fields")
    //     try {
    //       let formData = new FormData();
    //       formData.apend("profile_picture", input.profile_picture)
    //       axios
    //         .put(
    //           `https://${
    //             process.env.REACT_APP_DEV_API || document.domain
    //           }/users?sid=${sid}`,
    //           input, formData
    //         )
    //         .then(() => {
    //           alert("Your profile was updated successfully");
    //         });
    //     } catch (error) {
    //       alert("Error: " + error.message);
    //       console.error(error);
    //     }
    //     setInputHidden({
    //       first_name: "hidden",
    //       last_name: "hidden",
    //       birth_date: "hidden",
    //       profile_picture: "hidden",
    //       password: "hidden",
    //       edit: "hidden",
    //       button: "show",
    //       submit: "hidden",
    //     });
    //   });
    // setInput({
    //   id: userData.userDb.id,
    // });
    // setTimeout(() => {
    //   dispatch(getUsersById(userId));
    // }, 2000);
  };

  useEffect(() => {
    !userData && dispatch(getUsersById(userId));
  }, []);

  useEffect(() => {
    console.log(input);
  }, [input]);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Profile Image: </label>
          <img
            className="profPic"
            src={
              user.profile_picture
                ? user.profile_picture
                : userData.userDb.profile_picture
            }
            alt="Profile"
          />
          <div className={inputHidden.edit}>
            <input
              className={inputHidden.profile_picture}
              type="file"
              name="profile_picture"
              id="pic"
              value={input.profile_picture}
              ref={ref}
              // onChange={handleInputChange}
            />
            <button value="profile_picture" onClick={handleHidden}>
              Change
            </button>
          </div>
        </div>
        <div>
          <label>
            First Name:{" "}
            {user.first_name ? user.first_name : userData.userDb.first_name}
          </label>
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
            Last Name:{" "}
            {user.last_name
              ? user.last_name
              : userData.userDb.last_name && userData.userDb.last_name}
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
            {user.birth_date
              ? user.birth_date
              : userData.userDb.birth_date && userData.userDb.birth_date}
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

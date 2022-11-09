import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersById, selectUserById } from "../../store/userById";
import { selectThisUser, updateThisUser } from "../../store/thisUser";
import validate from "./validate";
import api, { endPoint } from "../../lib/api";
import "./Profile.css";

export default function Profile({ userId }) {
  const ref = React.useRef();
  const dispatch = useDispatch();
  let userData = useSelector(selectThisUser);

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
    direction: "hidden",
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
    ref.current.files.length && formData.append(
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
      .then(({ data }) => {
        dispatch(updateThisUser(data));
      })
      .catch((error) => console.error(error));
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
            </div>
          </div>

          <div className={inputHidden.edit}>
            <div className="pi">
              <input
                className={inputHidden.profile_picture}
                type="text"
                name="profile_picture"
                id="input"
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
            <label>First Name: </label>
            {user.first_name ? (
              <p className="resource"> {user.first_name}</p>
            ) : (
              <p className="resource"> {userData.userDb.first_name}</p>
            )}
          </div>
          <div className={inputHidden.edit}>
            <div className="pi">
              <input
                className={inputHidden.first_name}
                type="text"
                name="first_name"
                id="input"
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
            <label>Last Name: </label>
            {user.last_name ? (
              <p className="resource">{user.last_name}</p>
            ) : (
              <p className="resource">{userData.userDb.last_name}</p> && (
                <p className="resource">{userData.userDb.last_name}</p>
              )
            )}
            <div className={inputHidden.edit}>
              <div className="pi">
                <input
                  className={inputHidden.last_name}
                  type="text"
                  name="last_name"
                  id="input"
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
            <label>Birth Date: </label>
            {user.birth_date ? (
              <p className="resource">{user.birth_date}</p>
            ) : (
              <p className="resource">{userData.userDb.birth_date}</p> && (
                <p className="resource">{userData.userDb.birth_date}</p>
              )
            )}
            <div className={inputHidden.edit}>
              <div className="pi">
                <input
                  className={inputHidden.birth_date}
                  type="date"
                  name="birth_date"
                  id="input"
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
            <label>Email: </label>
            <p className="resource">{userData.userDb.email}</p>
          </div>
          {/* Inicio Diretion */}
          <div className="pi">
            <label>Direction Address:</label>
            <br />
            <label>Direction:</label>
            {user.direction ? (
              <p className="resource">{user.direction}</p>
            ) : (
              <p className="resource">{userData.userDb.direction}</p>
            )}
          </div>
          <div className={inputHidden.edit}>
            <div className="pi">
              <input
                type="text"
                name="direction"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <button className="btn" value="direction" onClick={handleHidden}>
                Edit
            </button>
            </div>
          </div>
          {/* Inicio Between Street1 */}
          <div className="pi">
            <label>Between Streets:</label>
            <br />
            <label>Streets 1:</label>
            {user.street1 ? (
              <p className="resource">{user.street1}</p>
            ) : (
              <p className="resource">{userData.userDb.street1}</p>
            )}
          </div>
          <div className={inputHidden.edit}>
            <div className="pi">
              <input
                type="text"
                name="street1"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <button className="btn" value="street1" onClick={handleHidden}>
                Edit
            </button>
            </div>            
          </div>
          {/* Inicio Between Street 2 */}
          <div className="pi">
            <label>Streets 2:</label>
            {user.street2 ? (
              <p className="resource">{user.street2}</p>
            ) : (
              <p className="resource">{userData.userDb.street2}</p>
            )}
          </div>
          <div className={inputHidden.edit}>
            <div className="pi">
              <input
                type="text"
                name="street2"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <button className="btn" value="street2" onClick={handleHidden}>
                Edit
            </button>
            </div>            
          </div>
          {/* inicio city  */}
          <div className="pi">
            <label>City:</label>
            {user.city ? (
              <p className="resource">{user.city}</p>
            ) : (
              <p className="resource">{userData.userDb.city}</p>
            )}
          </div>
          <div className={inputHidden.edit}>
            <div className="pi">
              <input
                type="text"
                name="city"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            <button className="btn" value="city" onClick={handleHidden}>
                Edit
            </button>
            </div>
          </div>
          {/* Inicio Postal */}
          <div className="pi">
            <label>Postal Code:</label>
            {user.postalCode ? (
              <p className="resource">{user.postalCode}</p>
            ) : (
              <p className="resource">{userData.userDb.postalCode}</p>
            )}
          </div>
          <div className={inputHidden.edit}>
            <div className="pi">
              <input
                type="text"
                name="postalCode"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            <button className="btn" value="postalCode" onClick={handleHidden}>
                Edit
            </button>
            </div>
          </div>
          {/* editable */}
          {/* fin editable */}
          {/* fin direction */}
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

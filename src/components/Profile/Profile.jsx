import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersById } from "../../store/userById";
import { selectThisUser } from "../../store/thisUser";

export default function Profile({ userId }) {
  const dispatch = useDispatch();
  const userData = useSelector(selectThisUser);

  useEffect(() => {
    !userData && dispatch(getUsersById(userId));
  }, []);

  useEffect(() => {}, [userData]);

  return (
    <>
      <div className="Container">
        <div>
          <label>Profile Image: </label>
          <img src={userData.userDb.profile_picture} alt="Profile Image" />
          <input value="Change Image"></input>
        </div>
        <div>
          <label>First Name: {userData.userDb.first_name}</label>
        </div>
        <div>
          <label>
            Last Name: {userData.userDb.last_name && userData.userDb.last_name}
          </label>
          {!userData.userDb.last_name && <input value="update"></input>}
        </div>
        <div>
          <label>
            Birth Date:{" "}
            {userData.userDb.birth_date && userData.userDb.birth_date}
          </label>
          {!userData.userDb.birth_date && (
            <input value="add birth_date"></input>
          )}
        </div>
        <div>
          <label>Email: {userData.userDb.email}</label>
        </div>
      </div>
    </>
  );
}

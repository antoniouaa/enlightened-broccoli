import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getUser } from "../Actions/userSlice";

import profile from "../Assets/profile-icon.png";

export const Profile = () => {
  const history = useHistory();
  const user = useSelector(getUser);

  if (!user) {
    history.push("/login");
  }

  const { username, email, created_at } = user;

  return (
    <div>
      <h2>Profile Page</h2>
      <img src={profile} alt="sample profile icon" />
      {/* <p>Name: {name}</p> */}
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Created at: {created_at}</p>
      {/* <p>
        Weight: {weight} Calorie Target: {calorieTarget}
      </p> */}
    </div>
  );
};

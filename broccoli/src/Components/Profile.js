import profile from "../Assets/profile-icon.png";

export const Profile = ({
  name,
  username,
  email,
  createdAt,
  weight,
  calorieTarget,
}) => {
  return (
    <div>
      <h2>Profile Page</h2>
      <img src={profile} alt="sample profile icon" />
      <p>Name: {name}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Created at: {createdAt}</p>
      <p>
        Weight: {weight} Calorie Target: {calorieTarget}
      </p>
    </div>
  );
};

export const LogIn = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
      headers: {},
    });
  };

  return (
    <div>
      <p>Log In to view profile</p>
      <form>
        <label>Username: </label>
        <input type="text" />
        <br />
        <label>Password: </label>
        <input type="password" />
        <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

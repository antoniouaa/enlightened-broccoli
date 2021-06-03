import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { isUserLoggedIn } from "../Actions/userSlice";

export const Header = () => {
  const loggedIn = useSelector(isUserLoggedIn);

  return (
    <nav>
      <section>
        <div>
          <Link to="/home">
            <h1>Broccoli</h1>
          </Link>
          <div>
            {loggedIn ? (
              <Link to="/profile">Profile</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </section>
    </nav>
  );
};

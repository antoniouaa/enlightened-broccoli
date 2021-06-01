import { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Profile } from "./Components/Profile";
import { LogIn } from "./Components/LogIn";
import { AddFoodItem } from "./Components/AddFoodItem";

import "./App.css";

const sample_user = {
  name: "Alex",
  username: "antoniouaa",
  email: "antoniouaa@hotmail.com",
  createdAt: new Date("2021-05-26T20:21:57.224501+01:00").toString(),
  weight: 68,
  calorieTarget: 2400,
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/me">
            {loggedIn ? (
              <Profile {...sample_user} />
            ) : (
              <Redirect exact from="/me" to="login" />
            )}
          </Route>
          <Route path="/add">
            {loggedIn ? (
              <AddFoodItem />
            ) : (
              <Redirect exact from="/add" to="login" />
            )}
          </Route>
          <Redirect exact from="/" to="login" />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

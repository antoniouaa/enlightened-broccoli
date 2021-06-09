import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { Home } from "./Components/Home";
import { NavBar } from "./Components/NavBar";
import { Footer } from "./Components/Footer";
import { Profile } from "./Components/Profile";
import { LogIn } from "./Components/LogIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/me" component={Profile} />
          <Redirect exact from="/profile" to="/me" />
          <Redirect exact from="/" to="/home" />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

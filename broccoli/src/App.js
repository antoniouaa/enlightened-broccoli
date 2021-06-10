import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Profile from "./Components/Profile";
import LogIn from "./Components/LogIn";
import Contact from "./Components/Contact";
import About from "./Components/About";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/me" component={Profile} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Redirect exact from="/profile" to="/me" />
          <Redirect exact from="/" to="/home" />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

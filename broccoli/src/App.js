import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Components/HomePage";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Profile from "./Components/Profile";
import LogIn from "./Components/LogIn";
import Contact from "./Components/Contact";
import About from "./Components/About";
import SignUp from "./Components/Signup";
import { EntryList, EntryCreate } from "./Components/Entries";
import ProtectedRoute from "./Components/ProtectedRoute";
import Calendar from "./Components/Calendar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/signup" component={SignUp} />
          <ProtectedRoute exact path="/calendar">
            <Calendar />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile">
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute exact path="/entries">
            <EntryList />
          </ProtectedRoute>
          <ProtectedRoute exact path="/entries/:id/edit">
            <EntryCreate />
          </ProtectedRoute>
          <Route exact path="/" component={Home} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

//https://reactrouter.com/web/example/animated-transitions
// Add CSS transitions between routes

// Complete the EntryBox styles

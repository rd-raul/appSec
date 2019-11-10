import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Forum from "./components/Forum";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Route exact path="/" component={Login} />{" "}
        <Route path="/register" component={Register} />{" "}
        <Route path="/forum" component={Forum} />{" "}
      </div>
    );
  }
}

export default App;

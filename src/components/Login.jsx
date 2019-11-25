import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: ""
    };

    this.update = this.update.bind(this);

    this.loginClick = this.loginClick.bind(this);
  }

  setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };
  getCookie = name => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  update(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  async loginClick(e) {
    e.preventDefault();
    if (this.state.password.length < 8) {
      this.setState({
        error: "Please enter the password with atleast 8 characters"
      });
      return;
    }
    const bodyParam = {
      name: this.state.username,
      password: this.state.password
    };
    try {
      let response = await fetch(
        "http://ec2-54-213-58-16.us-west-2.compute.amazonaws.com:8080/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bodyParam)
        }
      );
      let result = await response.json();
      this.setCookie("token", Date.now(), 1);
      this.props.history.push("/forum");
    } catch (error) {
      this.setState({ error: "Invalid Username/Password combination" });
    }
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.loginClick}>
          <h2> Login </h2>{" "}
          <div className="username">
            <input
              type="text"
              placeholder="Username..."
              value={this.state.username}
              onChange={this.update}
              name="username"
            />
          </div>
          <div className="password">
            <input
              type="password"
              placeholder="Password..."
              value={this.state.password}
              onChange={this.update}
              name="password"
            />
          </div>
          <input type="submit" value="Login" />
        </form>
        <Link to="/register"> Create an account </Link>{" "}
        <h4 className="error"> {this.state.error}</h4>
      </div>
    );
  }
}

export default Login;

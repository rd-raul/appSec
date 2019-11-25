import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      error: ""
    };

    this.update = this.update.bind(this);

    this.displayLogin = this.displayLogin.bind(this);
  }

  update(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  async displayLogin(e) {
    e.preventDefault();
    const bodyParam = {
      name: this.state.username,
      password: this.state.password
    };
    if (this.state.password.length < 8) {
      alert("Password should be of minimum 6 in length");
      return;
    }
    if (this.state.password === this.state.confirmPassword) {
      try {
        let response = await fetch(
          "http://ec2-54-213-58-16.us-west-2.compute.amazonaws.com:8080/user/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyParam)
          }
        );
        let result = await response.json();
        this.props.history.push("/forum");
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Passwords dont match");
      return;
    }
  }

  render() {
    return (
      <div className="register">
        <form onSubmit={this.displayLogin}>
          <h2>Register</h2>

          <div className="name">
            <input
              type="text"
              placeholder="Full Name"
              name="username"
              value={this.state.username}
              onChange={this.update}
            />
          </div>

          <div className="pasword">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.update}
            />
          </div>

          <div className="password">
            <input
              type="password"
              onChange={this.update}
              placeholder="Confirm Password"
              name="confirmPassword"
            />
          </div>

          <input type="submit" value="Sign Up" />
        </form>

        <Link to="/">Login Here</Link>
      </div>
    );
  }
}

export default Register;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.update = this.update.bind(this);

    this.loginClick = this.loginClick.bind(this);
  }

  update(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  loginClick(e) {
    e.preventDefault();
    const bodyParam = {
        name: this.state.username,
        password: this.state.password
    }
    axios
      .post(`http://ec2-54-213-58-16.us-west-2.compute.amazonaws.com:8080/user/login`, bodyParam)
      .then(res => {
          this.props.history.push('/forum');
      });
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
      </div>
    );
  }
}

export default Login;

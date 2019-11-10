import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
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

	displayLogin(e) {
		e.preventDefault();
		const bodyParam = {
			name: this.state.username,
			password: this.state.password
		}
		axios
		.post(`http://ec2-54-213-58-16.us-west-2.compute.amazonaws.com:8080/user/create`, bodyParam)
		.then(res => {
			this.props.history.push('/forum');
		});
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
						<input type="password" placeholder="Confirm Password" name="password1" />
					</div>

					<input type="submit" value="Login" />
				</form>

				<Link to="/">Login Here</Link>
			</div>
		);
	}
}

export default Register;

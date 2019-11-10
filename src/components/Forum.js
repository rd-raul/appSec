import React, { Component } from 'react';
import axios from "axios";
import "../css/Forum.css";

class Forum extends Component {
	constructor(props){
		super(props);
		this.state = {
			forumData: [],
			name : '',
			post : ''
		}
	}
	getPosts = () => {
		axios
		.get(`http://ec2-54-213-58-16.us-west-2.compute.amazonaws.com:8080/api/forum`)
		.then(res => {
			this.setState({
				forumData: res.data
			})
		});
	}
	componentDidMount() {
		this.getPosts();
	}

	inputChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
		  [name]: value
		});
	}

	createPost = () => {
		console.log(this.state)
		const bodyParam = {
			name: this.state.name,
			post: this.state.post
		}
		axios
		  .post(`http://ec2-54-213-58-16.us-west-2.compute.amazonaws.com:8080/api/forum`, bodyParam)
		  .then(res => {
			this.getPosts();
		  });
	}

	render() {
		return (
			<div>
				<div>
					<h4>Create New post</h4>
					<input type = "text" name="name" placeholder ="name" value={this.state.name} onChange = {this.inputChange}/>
					<input type = "text" name="post" placeholder="post" value={this.state.post} onChange = {this.inputChange}/>
					<button className ="createButton" onClick = {this.createPost}>Create New</button>
				</div>
				<h2>All Posts</h2>
				{this.state.forumData.map((data) => {
					return(
						<div className = "forum-container">
							<div>{data.name}</div>
							<div dangerouslySetInnerHTML={{ __html: data.post }} ></div>
						</div>
					)
				})}
			</div>
		);
	}
}

export default Forum;
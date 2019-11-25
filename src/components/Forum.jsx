import React, { Component } from "react";
import "../css/Forum.css";

class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forumData: [],
      name: "",
      post: "",
      error: ""
    };
  }
  getPosts = async () => {
    try {
      let response = await fetch(
        "http://ec2-54-213-58-16.us-west-2.compute.amazonaws.com:8080/api/forum",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      let result = await response.json();
      this.setState({
        forumData: result
      });
    } catch (e) {
      console.log(e);
    }
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
  componentDidMount() {
    if (!this.getCookie("token")) this.props.history.push("/");
    this.getPosts();
  }

  inputChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  eraseCookie = name => {
    document.cookie = name + "=; Max-Age=-99999999;";
  };

  signOut = () => {
    this.eraseCookie("token");
    this.props.history.push("/");
  };

  createPost = async () => {
    const bodyParam = {
      name: this.state.name,
      post: this.state.post
    };
    if (this.state.name.length == 0 || this.state.post.length == 0) {
      this.setState({ error: "please enter valid name/ post details" });
      return;
    }
    try {
      let response = await fetch(
        "http://ec2-54-213-58-16.us-west-2.compute.amazonaws.com:8080/api/forum",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bodyParam)
        }
      );
      let result = await response.json();
      this.getPosts();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <button className="createButton" onClick={this.signOut}>
          Sign out
        </button>
        <div>
          <h4>Create New post</h4>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.inputChange}
          />
          <input
            type="text"
            name="post"
            placeholder="post"
            value={this.state.post}
            onChange={this.inputChange}
          />
          <button className="createButton" onClick={this.createPost}>
            Create New
          </button>
          <h4 className="error">{this.state.error}</h4>
        </div>
        <h2>All Posts</h2>
        {this.state.forumData.map(data => {
          return (
            <div className="forum-container">
              <div>{data.name}</div>
              <div>{data.post}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Forum;

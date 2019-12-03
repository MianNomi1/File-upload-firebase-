import React, { Component } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import * as firebase from "firebase";
class Show extends Component {
  state = {
    obj: {}
  };
  componentDidMount() {
    firebase
      .database()
      .ref("users")
      .on("value", data => {
        console.log(data.val());
        this.setState({ obj: data.val() });
      });
  }
  handleClick = id => {
    console.log(id);
    this.props.history.push("/edit/" + id);
  };
  render() {
    let fetched = null;
    fetched = Object.keys(this.state.obj).map(key => {
      return (
        <div className="user-data">
          <h1>Name: </h1>
          <h2>{this.state.obj[key].username}</h2>
          <h1>Email: </h1>
          <h2>{this.state.obj[key].email}</h2>
          <h1>Image: </h1>
          <div className="image-container">
            <img src={this.state.obj[key].url}></img>
          </div>
          <button onClick={() => this.handleClick(key)}>Edit</button>
        </div>
      );
    });
    return (
      <div className="user-data-container">
        <h3>User Data:</h3>
        {fetched}
      </div>
    );
  }
}
export default withRouter(Show);

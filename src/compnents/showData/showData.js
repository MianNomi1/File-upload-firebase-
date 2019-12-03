import React, { Component } from "react";
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
export default Show;

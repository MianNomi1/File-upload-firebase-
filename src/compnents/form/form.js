import React, { Component } from "react";
import { withRouter } from "react-router";
import * as firebase from "firebase";
class Form extends Component {
  state = {
    name: null,
    email: null,
    image: null,
    url: ""
  };
  handleChange = e => {
    let { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };
  handleChangeImage = e => {
    if (e.target.files[0]) {
      this.setState({ image: e.target.files[0] });
    }
  };
  showDataHandler = () => {
    this.props.history.push("/users");
  };
  handleSubmit = e => {
    console.log(this.state.name, this.state.email, this.state.image);
    e.preventDefault();
    this.wirteUserData(this.state.name, this.state.email, this.state.image);
  };
  wirteUserData = (userName, email, image) => {
    let imageurl;
    let key;
    firebase
      .database()
      .ref("users")
      .push({
        username: userName,
        email: email,
        url: ""
      })
      .then(response => {
        key = response.key;
        return key;
      })
      .then(key => {
        var file = image;
        var newUrl = "";
        var ref = firebase.storage().ref("/users-" + key);
        ref
          .put(file)
          .then(fileData => {
            console.log("Uploaded a blob or file!", fileData);
            imageurl = fileData.metadata.fullPath;
            return imageurl;
          })
          .then(imageurl => {
            firebase
              .storage()
              .ref(imageurl)
              .getDownloadURL()
              .then(url => {
                console.log(url);
                newUrl = url;
                firebase
                  .database()
                  .ref("users")
                  .child(key)
                  .update({ url: newUrl });
                return newUrl;
              });
          });
      });
  };
  // uploadImage = key => {
  //   var file = this.state.image;
  //   var ref = firebase.storage().ref("/users-" + Date.now());
  //   ref.put(file).then(function(snapshot) {
  //     console.log("Uploaded a blob or file!", snapshot);
  //   });
  // };
  render() {
    return (
      <div className="form-container">
        <h3>Enter Data:</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Name: </label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={event => this.handleChange(event)}
            value={this.state.text}
          />
          <label>Email: </label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={event => this.handleChange(event)}
            value={this.state.text}
          />
          <label>Image: </label>
          <input id="image" type="file" onChange={this.handleChangeImage} />

          <button onSubmit={this.handleSubmit}>Send</button>
        </form>
        <button onClick={this.showDataHandler}>Show All</button>
      </div>
    );
  }
}
export default withRouter(Form);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as firebase from "firebase";
class EditData extends Component {
  state = {
    obj: {},
    name: null,
    email: null,
    image: null,
    url: ""
  };
  componentDidMount() {
    let key = this.props.match.params.id;
    firebase
      .database()
      .ref("users/" + key)
      .once("value", data => {
        console.log(data.val());
        this.setState({ obj: data.val() });
      });
  }
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
  handleUpdate = e => {
    console.log(this.state.name, this.state.email, this.state.image);
    e.preventDefault();
    this.wirteUserData(this.state.name, this.state.email, this.state.image);
  };
  wirteUserData = (userName, email, image) => {
    let imageurl;
    let key = this.props.match.params.id;
    firebase
      .database()
      .ref("users")
      .child(key)
      .update({
        username: userName,
        email: email,
        url: ""
      })
      .then(() => {
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
  getBackHandler = () => {
    this.props.history.push("/users");
  };
  render() {
    return (
      <div>
        <h1>Edit form : </h1>
        <div className="form-container">
          <h3>Enter Data:</h3>
          <form onSubmit={this.handleUpdate}>
            <label>Name: </label>
            <input
              id="name"
              type="text"
              name="name"
              onChange={this.handleChange}
              //value={this.state.obj.username}
            />
            <label>Email: </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={this.handleChange}
              //value={this.state.obj.email}
            />
            <label>Image: </label>
            <input id="image" type="file" onChange={this.handleChangeImage} />

            <button onSubmit={this.handleUpdate}>Update</button>
          </form>
          <button onClick={this.getBackHandler}>go Back</button>
        </div>
      </div>
    );
  }
}

export default withRouter(EditData);

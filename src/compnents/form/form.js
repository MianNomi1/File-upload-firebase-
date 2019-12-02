import React, { Component } from "react";

class Form extends Component {
  state = {
    name: null,
    email: null,
    image: null,
    url: ""
  };
  handleChange = e => {
    this.setState({
      name: e.target.value,
      email: e.target.value
    });
  };
  handleChangeImage = e => {
    if (e.target.files[0]) {
      this.setState({ image: e.target.files[0] });
    }
  };
  render() {
    return (
      <div className="form-container">
        <h3>Enter Data:</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Name: </label>
          <input
            id="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <label>Email: </label>
          <input
            id="email"
            type="email"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <label>Image: </label>
          <input id="image" type="file" onChange={this.handleChangeImage} />

          <button>Send</button>
        </form>
      </div>
    );
  }
}
export default Form;

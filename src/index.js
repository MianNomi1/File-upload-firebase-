import React from "react";
import ReactDOM from "react-dom";
import * as firebase from "firebase";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

firebase.initializeApp({
  apiKey: "AIzaSyDzc1dUo6IDM6IH7p1sPZ94FJtSm639rfg",
  authDomain: "image-upload-7f47d.firebaseapp.com",
  databaseURL: "https://image-upload-7f47d.firebaseio.com",
  projectId: "image-upload-7f47d",
  storageBucket: "image-upload-7f47d.appspot.com",
  messagingSenderId: "536964022548",
  appId: "1:536964022548:web:8ed548b74c6bddd01fc201",
  measurementId: "G-SRCVGSK0LH"
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

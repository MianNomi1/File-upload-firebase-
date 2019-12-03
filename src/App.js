import React from "react";
import Form from "../src/compnents/form/form";
import Users from "../src/compnents/showData/showData";
import EditData from "../src/compnents/editData/editData";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Form} />
        <Route exact path="/edit/:id" component={EditData} />
        <Route exact path="/users" component={Users} />
      </Switch>
    </div>
  );
}

export default App;

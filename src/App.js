import React, { Component } from "react";
import { connect } from "react-redux";
import {Link, Route, Switch, withRouter} from "react-router-dom";

import "./App.css";

import Dashboard from "./components/Dashboard";
import { getCurrentUser } from "./actions";

/**
 *  The React App that harbors main routes and serves them with given props
 */
class App extends Component {
  // constructor(props) {
  //   super(props);
  //   props.dispatch(geetCurrentUser());
  // }

  componentDidMount() {
    this.props.dispatch(getCurrentUser());
  }

  render() {
    
    return (
      <div className="app">
        <Dashboard {...this.props}/>
      </div>
    );
  }
}
//connect component to Redux
export default connect(state => ({ state }))(App);

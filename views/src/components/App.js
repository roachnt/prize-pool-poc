import React, { Component } from "react";
import { connect } from "react-redux";
import { injectGlobal } from "emotion";

import { loginUserAction } from "../actions/userActions";
import LoginForm from "./LoginForm";

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Lato:300');
  html, body {
    background-repeat: no-repeat;
    background: linear-gradient(120deg,#3a3590,#004dad);
    font-family: Lato, sans-serif;
    height: 100vh;
    margin: 0;
  }
  #root {
    height: 100%;
  }
`;

class App extends Component {
  render() {
    return (
      <div style={{ height: "100%" }}>
        <LoginForm />
        <div />
      </div>
    );
  }
}

const mapStateToProps = state => state;
const mapActionsToProps = {
  loginUser: loginUserAction
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);

import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { Link } from "react-router-dom";

import { loginUserAction } from "../actions/userActions";
import LoginProvider from "./LoginProvider";

class LoginForm extends Component {
  render() {
    return (
      <div style={{ height: "100%" }}>
        {this.props.user ? (
          <React.Fragment>
            {this.props.user.name}
            <button onClick={() => this.props.loginUser(null)}>Logout</button>
          </React.Fragment>
        ) : (
          <LoginProvider>
            {({ login, error }) => (
              <form onSubmit={login} className={formStyle}>
                {error ? (
                  <div style={{ color: "white" }}>Could not log in!</div>
                ) : null}
                <label className={labelStyle} htmlFor="email">
                  email:
                </label>
                <input
                  className={css`
                    ${inputStyle};
                    margin-bottom: 10px;
                  `}
                  name="email"
                  type="email"
                />
                <label className={labelStyle} htmlFor="password">
                  password:
                </label>
                <input className={inputStyle} name="password" type="password" />
                <button className={buttonStyle} type="submit">
                  login
                </button>
                <div style={{ color: "white", marginTop: 20 }}>
                  don't have an account?{" "}
                  <Link to="/register" style={{ color: "lightblue" }}>
                    sign up
                  </Link>
                </div>
              </form>
            )}
          </LoginProvider>
        )}
      </div>
    );
  }
}

const formStyle = css`
  width: 250px;
  background: black;
  text-align: center;
  padding: 15px;
  border-radius: 5px;
  margin: 20px;
  display: inline-block;
`;

const labelStyle = css`
  color: white;
  font-size: 20px;
`;

const inputStyle = css`
  display: block;
  width: 90%;
  margin: 0 auto;
  font-size: 22px;
  border-radius: 5px;
  border: none;
  margin-top: 10px;
  padding: 5px;
`;

const buttonStyle = css`
  margin-top: 15px;
  font-size: 22px;
  background: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const mapStateToProps = state => state;
const mapActionsToProps = {
  loginUser: loginUserAction
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LoginForm);

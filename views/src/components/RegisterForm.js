import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";

import { loginUserAction } from "../actions/userActions";
import RegisterProvider from "./RegisterProvider";

class LoginForm extends Component {
  render() {
    return (
      <div
        className={css`
          display: flex;
          height: 100%;
          justify-content: center;
          align-items: center;
        `}
      >
        {this.props.user ? (
          <div>
            You're already logged in, {this.props.user.name}!{" "}
            <button onClick={() => this.props.loginUser(null)}>Logout</button>
          </div>
        ) : (
          <RegisterProvider>
            {({ register }) => (
              <form className={formStyle} onSubmit={register}>
                <label className={labelStyle} htmlFor="name">
                  name:
                </label>
                <input className={inputStyle} name="name" type="text" />
                <label className={labelStyle} htmlFor="email">
                  email:
                </label>
                <input className={inputStyle} name="email" type="email" />
                <label className={labelStyle} htmlFor="password">
                  password:
                </label>
                <input className={inputStyle} name="password" type="password" />
                <label className={labelStyle} htmlFor="password-confirm">
                  confirm password:
                </label>
                <input
                  className={inputStyle}
                  name="password-confirm"
                  type="password"
                />
                <button className={buttonStyle} type="submit">
                  register
                </button>
              </form>
            )}
          </RegisterProvider>
        )}
      </div>
    );
  }
}

const formStyle = css`
  width: 300px;
  background: black;
  text-align: center;
  padding: 15px;
  border-radius: 5px;
  margin: 0 auto;
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
  margin-bottom: 15px;
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

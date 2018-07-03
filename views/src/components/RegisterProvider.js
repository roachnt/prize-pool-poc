import { Component } from "react";
import { connect } from "react-redux";

import { loginUserAction } from "../actions/userActions";
import { getTokenFromRegister, getUserFromToken } from "../helpers/apiHelper";
import { history } from "./Router";

class LoginProvider extends Component {
  register = e => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      "password-confirm": e.target["password-confirm"].value
    };
    getTokenFromRegister(data)
      .then(token =>
        getUserFromToken(token).then(user => {
          this.props.loginUser({ ...user, token });
          history.push("/");
        })
      )
      .catch(err => console.log(err));
  };

  render = () => this.props.children({ register: this.register });
}

const mapStateToProps = state => state;
const mapActionsToProps = {
  loginUser: loginUserAction
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LoginProvider);

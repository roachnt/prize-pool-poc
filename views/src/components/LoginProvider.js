import { Component } from "react";
import { connect } from "react-redux";

import { loginUserAction } from "../actions/userActions";
import { getTokenFromLogin, getUserFromToken } from "../helpers/apiHelper";

class LoginProvider extends Component {
  state = { error: false };
  login = e => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    };
    getTokenFromLogin(data)
      .then(
        token =>
          token
            ? getUserFromToken(token).then(user => this.props.loginUser(user))
            : this.setState({ error: true })
      )
      .catch(err => console.log(err));
  };

  render = () =>
    this.props.children({ login: this.login, error: this.state.error });
}

const mapStateToProps = state => state;
const mapActionsToProps = {
  loginUser: loginUserAction
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LoginProvider);

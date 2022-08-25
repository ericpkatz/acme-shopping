import React, { Component } from "react";
import { login } from "./store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserCreateForm from "./Users/UserCreateForm";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.loginAsGuest = this.loginAsGuest.bind(this);
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSubmit(ev) {
    ev.preventDefault();
    this.props.login(this.state);
  }
  loginAsGuest() {
    this.props.login({ username: "guest", password: "guest" });
  }
  render() {
    const { onChange, onSubmit, loginAsGuest } = this;
    const { username, password } = this.state;
    return (
      <div>
        <header>
          <h1>Acme Shopping</h1>
          <p>Exotic Drinks</p>
        </header>
        <form onSubmit={onSubmit}>
          <input name="username" onChange={onChange} value={username} />
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <button className="createAccount-btn">
          <Link to="/createAccount">Create An Account</Link>
        </button>
        <button onClick={loginAsGuest}>Continue As Guest</button>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(null, mapDispatch)(SignIn);

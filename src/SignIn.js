import React, { Component } from "react";
import { login, createGuestAccount } from "./store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserCreateForm from "./Users/UserCreateForm";
import axios from "axios";

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
  async loginAsGuest() {
    const guest = (await axios.get("/api/sessions/guest")).data;

    if (guest) {
      console.log(guest);
      this.props.login({ username: "", password: "" });
    } else {
      console.log(guest);
      this.props.createGuestAccount({ username: "", password: "" });
    }
  }
  render() {
    const { onChange, onSubmit, loginAsGuest } = this;
    const { username, password } = this.state;
    return (
      <div>
        <header>
          <h1>Thirsty International</h1>
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
        <button>
          <Link className="createAccount-btn" to="/createAccount">
            Create An Account
          </Link>
        </button>
        <button onClick={loginAsGuest}>Continue As Guest</button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
    createGuestAccount: (credentials) => {
      dispatch(createGuestAccount(credentials));
    },
  };
};

export default connect(mapState, mapDispatch)(SignIn);

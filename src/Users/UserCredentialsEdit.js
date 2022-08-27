import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { updateUserCredential } from "../store/auth";

class UserCredentialsEdit extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      passwordConfirm: "",
    };
    this.update = this.update.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  async update(e) {
    //       e.preventDefault();
    const information = {
      username: this.state.username,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      isGuest: false,
    };

    try {
      await this.props.update(information);
    } catch (ex) {
      console.log(ex);
    }
  }

  //   componentDidMount(){
  // this.setState({ username:this.props.auth.username, password:this.props.auth.password, passwordConfirm:this.props.auth.password  });
  //   }
  validatePassword() {
    return (
      this.state.password.length > 0 &&
      this.state.passwordConfirm.length > 0 &&
      this.state.password === this.state.passwordConfirm
    );
  }

  render() {
    const { username, password, passwordConfirm } = this.state;
    const { update, validatePassword } = this;
    return (
      <section>
        <div>
          <h1>{this.props.auth.username}</h1>
        </div>
        <h2>Update Credentials </h2>
        <form onSubmit={update}>
          <label>
            New Username:
            <input
              type="username"
              name="username"
              value={username}
              onChange={(ev) => this.setState({ username: ev.target.value })}
              required
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(ev) => this.setState({ password: ev.target.value })}
            />
          </label>
          <label>
            Password Confirmation:
            <input
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={(ev) =>
                this.setState({ passwordConfirm: ev.target.value })
              }
              required
            />
          </label>
          <button disabled={!validatePassword()} type="submit" className='update-btn'>
            Update Credentials
          </button>
          <button className='back-btn'>
            <Link to="../profile">Go Back</Link>
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatch = (dispatch) => {
  return {
    update: (auth) => dispatch(updateUserCredential(auth)),
  };
};

export default connect(mapStateToProps, mapDispatch)(UserCredentialsEdit);

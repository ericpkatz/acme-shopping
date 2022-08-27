import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  createAccount,
  updateGuestToUser,
  createGuestAccount,
} from "../store/auth";
import axios from "axios";

class UserCreateForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: "",
      username: "",
      password: "",
      imageUrl: "",
      address: "",
      city:'',
      state:'',
      zipCode:''
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault(e);
    const guest = (await axios.get("/api/sessions/guest")).data;
    if (guest) {
      console.log("guest found", guest);
      // this.props.createAccount(this.state);
      this.props.updateGuestToUser(guest, { ...this.state, isGuest: false });
    } else {
      console.log("no guest");
      this.props.createAccount(this.state);
    }
  };
  render() {
    const { username, firstName, lastName, email, password, imageUrl, address,city,state,zipCode } = this.state;
    const { onChange, handleSubmit } = this;
    return (
      <section>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </label>
                 <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={onChange}
              required
            />
          </label>
                 <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </label>
          <label>
            imageUrl:
            <input
              type="text"
              name="imageUrl"
              value={imageUrl}
              onChange={onChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={address}
              onChange={onChange}
              required
            />
          </label>
          <label>City:
          <input
              type='text'
              name='city'
              value={ city }
              onChange={onChange}
              required
             />
          </label>
          <label>State:
          <input
              type='text'
              name='state'
              value={ state }
               onChange={onChange}
              required
            />
           </label>
           <label>Zipcode:
           <input
           type='text'
            name='zipCode'
            value={ zipCode }
            onChange={ onChange}
            required
                        />
                    </label>
          <button type="submit">Create Account</button>
          <button>
            <Link to="/">Go Back</Link>
          </button>
        </form>
      </section>
    );
  }
}

const mapState = (state) => {
  console.log(state);
  return { state };
};
const mapDispatch = (dispatch) => {
  return {
    createAccount: (information) => {
      dispatch(createAccount(information));
    },
    updateGuestToUser: (guest, updateInfo) => {
      dispatch(updateGuestToUser(guest, updateInfo));
    },
    createGuestAccount: (guest) => {
      dispatch(createGuestAccount(guest));
    },
  };
};
export default connect(mapState, mapDispatch)(UserCreateForm);

import React, { Component } from 'react';
import { login } from './store';
import { connect } from 'react-redux';
import UserCreateForm from './Users/UserCreateForm';

class SignIn extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSubmit(ev){
    ev.preventDefault();
    this.props.login(this.state);
  }
  render(){
    const { onChange, onSubmit } = this;
    const { username, password } = this.state;
    return (
      <div>
        <header>
          <h1>Acme Shopping</h1>
          <p>Exotic Drinks</p>
        </header>
        <form onSubmit={ onSubmit }>
          <input name='username' onChange={ onChange } value={ username }/>
          <input type='password' name='password' value={ password } onChange={ onChange }/>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <button className="createAccount-btn" onClick={() => {<UserCreateForm />}}>Create An Account</button>
      </div>
    );
  }
}

const mapDispatch = (dispatch)=> {
  return {
    login: (credentials)=> {
      dispatch(login(credentials));
    }
  };
};

export default connect(null, mapDispatch)(SignIn);

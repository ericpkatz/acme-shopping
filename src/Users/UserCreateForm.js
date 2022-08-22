import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { createAccount } from '../store/auth';
class UserCreateForm extends Component {
    constructor(){
        super()
        this.state = {
            // firstName: '',
            // lastName: '',
            email: '',
            username: '',
            password: '',
            imageUrl: '',
            address: ''
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = (e) => {
        e.preventDefault(e);
        this.props.createAccount(this.state);
    }
    render(){
        const { username, email, password, imageUrl, address } = this.state;
        const { onChange, handleSubmit } = this;
        return (
            <section>
                <h2>Create Account</h2>
                <form onSubmit={ handleSubmit }>
                    <label>Username:
                        <input
                            type='text'
                            name='username'
                            value={ username }
                            onChange={ onChange }
                            required
                        />
                    </label>
                    <label>Password:
                        <input
                            type='password'
                            name='password'
                            value={ password }
                            onChange={ onChange }
                            required
                        />
                    </label>
                    <label>Email:
                        <input
                            type='email'
                            name='email'
                            value={ email }
                            onChange={ onChange }
                            required
                        />
                    </label>
                    <label>imageUrl:
                        <input
                            type='text'
                            name='imageUrl'
                            value={ imageUrl }
                            onChange={ onChange }
                        />
                    </label>
                    <label>Address:
                        <input
                            type='text'
                            name='address'
                            value={ address }
                            onChange={ onChange }
                            required
                        />
                    </label>
                    <button type='submit'>Create Account</button>
                    <button><Link to='/'>Go Back</Link></button>
                </form>
            </section>
        )
    }
};
const mapDispatch = dispatch => {
    return {
        createAccount: (information) => {
            dispatch(createAccount(information))
        }
    }
};
export default connect(null, mapDispatch)(UserCreateForm);
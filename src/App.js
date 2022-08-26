import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCart, exchangeToken, logout, fetchProducts } from './store';
import { Link, Route } from 'react-router-dom';
import SignIn from './SignIn';
import UserCart from './Users/UserCart';
import UserProfile from './Users/UserProfile';
import UserProfileEdit from './Users/UserProfileEdit';
import UserCredentialsEdit from './Users/UserCredentialsEdit';
import ProductSpecificView from './Products/ProductSpecificView';
import ProductsView from './Products/ProductsView';
import UserCreateForm from './Users/UserCreateForm';
import Header from './Header';
import ProductForm from './Products/ProductForm';

class App extends React.Component {
  componentDidMount() {
    this.props.exchangeToken();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.auth.id && this.props.auth.id) {
      this.props.loadData();
    }
  }
  render() {
    const { auth } = this.props;
    return (
      <main>
        {auth.id ? (
          <div id="main-app">
            <Route path="/:view?" component={Header} />
            <div>
              <Route exact path='/' component={ UserCart } />
              <Route exact path='/products' component={ ProductsView } />
              <Route exact path='/products/:id' component={ ProductSpecificView } />
              { auth.isAdmin ?
              <div>
                <Route exact path='/products/:id' component={ ProductForm } />
                <Route exact path='/products' component={ ProductForm } />
              </div> : null }
              <Route path='/cart' component={ UserCart } />
              <Route path='/profile' component={ UserProfile } exact />
              <Route path='/profile/edit' component={ UserProfileEdit } exact/>
              <Route path='/profile/edit/credentials' component={ UserCredentialsEdit } />
            </div>
          </div>
        ) : (
          <div>
            <Route exact path='/' component={ SignIn } />
            <Route exact path='/createAccount' component={ UserCreateForm } />
          </div>
        )}
      </main>
    );
  }
}
const mapDispatch = (dispatch) => {
  return {
    exchangeToken: () => dispatch(exchangeToken()),
    loadData: () => {
      dispatch(fetchProducts());
      dispatch(fetchCart());
    },
  };
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, mapDispatch)(App);

 //ignore this comment. Just to mark changes
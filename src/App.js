import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCart, exchangeToken, logout, fetchProducts } from './store';
import { Link, Route } from 'react-router-dom';
import SignIn from './SignIn';
import UserCart from './Users/UserCart';
import UserProfile from './Users/UserProfile';
import ProductSpecificView from './Products/ProductSpecificView';
import ProductsView from './Products/ProductsView';
import UserCreateForm from './Users/UserCreateForm';
import Header from './Header';

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
          <div>
            <Route path="/:view?" component={Header} />
            <div>
              <Route exact path='/' component={ UserCart } />
              <Route exact path='/products' component={ ProductsView } />
              <Route exact path='/products/:id' component={ ProductSpecificView } />
              <Route path='/cart' component={ UserCart } />
              <Route path='/profile' component={ UserProfile } />

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

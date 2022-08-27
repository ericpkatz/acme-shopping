import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, exchangeToken, logout, fetchProducts, fetchUserOrders } from './store';
import { Route } from 'react-router-dom';
import SignIn from './SignIn';
import UserCart from './Users/UserCart';
import UserProfile from './Users/UserProfile';
import UserProfileEdit from './Users/UserProfileEdit';
import UserCredentialsEdit from './Users/UserCredentialsEdit';
import ProductSpecificView from './Products/ProductSpecificView';
import ProductsView from './Products/ProductsView';
import UserCreateForm from './Users/UserCreateForm';
import OrderCompleted from './OrderCompleted';
import UserOrdersCompletedDetail from './Users/UserOrdersCompletedDetail';
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
    console.log('Chloe this is the store');
    console.log(this.props);
   
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
              <Route path='/orders/complete' component={ OrderCompleted } />
              <Route path='/profile/orders/:id' component={ UserOrdersCompletedDetail } />
            </div>
          </div>
        ) : (
          <div>
          <Route exact path="/" component={SignIn} />
            <Route exact path="/createAccount" component={UserCreateForm} />
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
      dispatch(fetchUserOrders());
    },
  };
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, mapDispatch)(App);

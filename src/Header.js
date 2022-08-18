import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "./store";
const Header = ({ products, auth, cart, match, logout }) => {
  const view = match.params.view;
  return (
    <section>
      <header>
        <h1>Acme Shopping</h1>
        <p>Exotic Drinks</p>
      </header>
      <nav>
        <Link to="/" className={!view ? "selected" : ""}>
          Home
        </Link>
        <Link to="/products" className={view === "products" ? "selected" : ""}>
          Products
        </Link>
        <Link to="/cart" className={view === "cart" ? "selected" : ""}>
          Cart ({cart.lineItems.length})
        </Link>
        <Link to="/profile" className={view === "profile" ? "selected" : ""}>
          Profile
        </Link>
        <Link to="/wishlist" className={view === "wishlist" ? "selected" : ""}>
          Wish List
        </Link>
        <button onClick={() => logout()}>Logout {auth.username}</button>
      </nav>
      {/* <div>
                searchbar div
            </div> */}
    </section>
  );
};

const mapState = (state) => {
  return state;
};
const mapDispatch = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};
export default connect(mapState, mapDispatch)(Header);

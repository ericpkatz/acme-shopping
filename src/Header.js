import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "./store";
const Header = ({ auth, cart, logout }) => {

  const history = useHistory();
  let location = history.location.pathname;
  const navigateHome = () => history.push('/');
  const navigateProducts = () => history.push('/products');
  const navigateCart = () => history.push('/cart');
  const navigateProfile = () => history.push('/profile');
  const navigateWishlist = () => history.push('wishlist');
  const navigateUsersList = () => history.push('/usersList');
  const navigateSignInPage = () => {
    if (auth.id) {
      logout();
    }
    history.push("/");
  };
  return (
    <section>
      <header>
        <h1>Thirsty International</h1>
        <p>Exotic Drinks</p>
      </header>
      {auth.id ? (
        <nav>
          <div onClick={navigateHome} className={!location ? "selected" : ""}>
            {" "}
            Home{" "}
          </div>
          <div
            onClick={navigateProducts}
            className={location === "products" ? "selected" : ""}
          >
            {" "}
            Products{" "}
          </div>
          <div
            onClick={navigateCart}
            className={location === "cart" ? "selected" : ""}
          >
            {" "}
            Cart ({cart.lineItems.length} items)
          </div>
          <div
            onClick={navigateProfile}
            className={location === "profile" ? "selected" : ""}
          >
            {" "}
            Profile{" "}
          </div>
          <div
            onClick={navigateWishlist}
            className={location === "wishlist" ? "selected" : ""}
          >
            {" "}
            Wish List{" "}
          </div>
          {auth.isGuest ? (
            <div onClick={navigateSignInPage} className="logout">
              {" "}
              Sign In{" "}
            </div>
          ) : (
            <div onClick={navigateSignInPage} className="logout">
              {" "}
              Logout {auth.username}{" "}
            </div>
          )}
        </nav>
      ) : (
        <nav>
          <div onClick={navigateSignInPage}> Sign In </div>
        </nav>
      )
    }
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

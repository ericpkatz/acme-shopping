import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateCartToOrder } from "./store";

const WillCompleteOrder = ({ cart, orderCart }) => {
  useEffect(() => {
    if (!cart || !cart.isCart) {
      return;
    }
    orderCart(cart);
  }, [cart]);
  
  return (
    <section>
    </section>
  );
};

const mapState = ({ cart }) => {
  return {
    cart
  };
};
const mapDispatch = (dispatch) => {
  return {
    orderCart: (cart) => dispatch(updateCartToOrder(cart)),
  };
};
export default connect(mapState, mapDispatch)(WillCompleteOrder);

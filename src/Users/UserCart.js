//Alejandro
//list out all lineItems
//be able to change quantity : decrease or increase
//be able to remove lineItem
//should be able to display subtotal
//price X quantity

import React, { Fragment } from "react";
import { connect } from "react-redux";

const UserCart = ({ cart, subtotal }) => {
  return (
    <Fragment>
      <ul>
        {cart.lineItems.map((lineItem) => {
          return (
            <li key={lineItem.id}>
              <div>{lineItem.product.name}</div>
              <div>${lineItem.product.price}</div>
              <div>{lineItem.quantity}:QTY</div>
            </li>
          );
        })}
      </ul>
      <div>Subtotal: ${subtotal}</div>
    </Fragment>
  );
};
const mapState = (state) => {
  const lineItems = state.cart.lineItems;
  const moneyArr = lineItems.map((lineItem) => lineItem.product.price * 1);
  const calculateSum = () => {
    return moneyArr.reduce((total, current) => {
      return total + current;
    }, 0);
  };

  return {
    cart: state.cart,
    subtotal: calculateSum().toFixed(2),
  };
};
const mapDispatch = (dispatch) => {
  return {};
};
export default connect(mapState, null)(UserCart);

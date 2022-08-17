//Alejandro
//list out all lineItems x
//be able to change quantity : decrease or increase
//be able to remove lineItem
//should be able to display subtotal x
//price X quantity x

import React, { Fragment } from "react";
import { connect } from "react-redux";
import { updateCartItem } from "../store";

const UserCart = ({ cart, subtotal, increment }) => {
  return (
    <Fragment>
      <ul>
        {cart.lineItems.map((lineItem) => {
          return (
            <li key={lineItem.id}>
              <div>{lineItem.product.name}</div>
              <div>${lineItem.product.price}</div>
              <div>
                <button onClick={() => increment(lineItem, -1)}>-</button>
                {lineItem.quantity}
                <button onClick={() => increment(lineItem, +1)}>+</button>
                :QTY
              </div>
              <button>X</button>
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
  const subtotalArr = lineItems.map(
    (lineItem) => lineItem.product.price * 1 * lineItem.quantity
  );
  const calculateSum = () => {
    return subtotalArr.reduce((total, current) => {
      return total + current;
    }, 0);
  };

  return {
    cart: state.cart,
    subtotal: calculateSum().toFixed(2),
  };
};
const mapDispatch = (dispatch) => {
  return {
    increment: (lineItem, dir) => {
      const item = { ...lineItem, quantity: lineItem.quantity + dir };
      dispatch(updateCartItem(item));
    },
  };
};
export default connect(mapState, mapDispatch)(UserCart);

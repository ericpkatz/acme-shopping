//Alejandro
//list out all lineItems x
//be able to change quantity : decrease or increase x
//be able to remove lineItem x
//should be able to display subtotal x
//price X quantity x

import React from "react";
import { connect } from "react-redux";
import { updateCart } from "../store";

const UserCart = ({ cart, subtotal, increment, deleteLineItem }) => {
  return (
    <section>
      <table className="table">
        <tbody>
          <tr>
            <th></th>
            <th>Items</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
          {(cart.lineItems || []).map((lineItem) => {
            let subtotal = lineItem.product.price * lineItem.quantity;
            return (
              <tr key={lineItem.id}>
                  <td><img src={lineItem.product.imgUrl} width='120' height='80'/></td>
                  <td>{lineItem.product.name}</td>
                  <td>
                    <button onClick={() => increment(lineItem, -1)} disabled={lineItem.quantity === 1}>-</button>
                    {lineItem.quantity}
                    <button onClick={() => increment(lineItem, +1)}>+</button>
                  </td>
                  <td>${lineItem.product.price}</td>
                  <td>${ subtotal }</td>
                  <td><button onClick={() => {deleteLineItem(lineItem)}}>Remove</button></td>
              </tr>
            );
          })}
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Subtotal: ${subtotal}</th>
            <th><button>Continue to Checkout</button></th>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
const mapState = (state) => {
  const lineItems = state.cart.lineItems;
  const subtotalArr = (lineItems || []).map(
    (lineItem) => lineItem.product.price * 1 * lineItem.quantity
  );
  const calculateSum = () => {
    return subtotalArr.reduce((total, current) => {
      return total + current;
    }, 0);
  };

  return {
    cart: state.cart || [],
    subtotal: calculateSum().toFixed(2),
  };
};
const mapDispatch = (dispatch) => {
  return {
    increment: (lineItem, dir) => {
      const item = { ...lineItem, quantity: lineItem.quantity + dir };
      dispatch(updateCart(item));
    },
    deleteLineItem: (lineItem) => {
      const item = { ...lineItem, quantity: 0 };
      dispatch(updateCart(item));
    },
  };
};
export default connect(mapState, mapDispatch)(UserCart);

//Alejandro
//list out all lineItems x
//be able to change quantity : decrease or increase x
//be able to remove lineItem x
//should be able to display subtotal x
//price X quantity x

import React from "react";
import { connect } from "react-redux";
import { updateLineItem, updateCart } from "../store";

const UserCart = ({ lineItems, subtotal, increment, deleteLineItem }) => {
  return (
    <section className="main">
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
          {(lineItems || []).map((lineItem) => {
            let subtotal = lineItem.product.price * lineItem.quantity;
            return (
              <tr key={lineItem.id}>
                <td>
                  <img src={lineItem.product.imgUrl} width="120" height="80" />
                </td>
                <td>{lineItem.product.name}</td>
                <td>
                  <button
                    onClick={() => increment(lineItem, -1)}
                    disabled={lineItem.quantity === 1}
                  >
                    -
                  </button>
                  {lineItem.quantity}
                  <button onClick={() => increment(lineItem, +1)}>+</button>
                </td>
                <td>${lineItem.product.price}</td>
                <td>${subtotal && subtotal.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteLineItem(lineItem);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Subtotal: ${subtotal}</th>
            <th>
              <button>Continue to Checkout</button>
            </th>
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

  //Sorts the Line Items
  (state.cart.lineItems || []).sort(function (a, b) {
    return a.id - b.id;
  });
  return {
    lineItems: state.cart.lineItems || [],
    subtotal: calculateSum().toFixed(2),
  };
};
const mapDispatch = (dispatch) => {
  return {
    increment: (lineItem, dir) => {
      const item = { ...lineItem, quantity: lineItem.quantity + dir };
      dispatch(updateLineItem(item));
    },
    deleteLineItem: (lineItem) => {
      const item = { ...lineItem, quantity: 0 };
      dispatch(updateLineItem(item));
    },
  };
};
export default connect(mapState, mapDispatch)(UserCart);

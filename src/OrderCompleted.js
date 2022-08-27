import React from "react";
import axios from "axios";
import { connect } from "react-redux";
// import { updateLineItem, updateCart } from "./store";
import auth from "./store/auth";
import { Link } from "react-router-dom";

const OrderCompleted = ({ lineItems, subtotal, increment, deleteLineItem }) => {
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
              {auth.isGuest ? (
                <button>
                  <Link to="/profile/edit/credentials">
                    Create Profile to Checkout
                  </Link>
                </button>
              ) : (
                <button>df</button>
              )}
            </th>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
const mapState = ({ cart, auth }) => {
  const lineItems = cart.lineItems;
  const subtotalArr = lineItems.map((lineItem) => {
    return lineItem.product.price * lineItem.quantity;
  });
  const calculateSum = () => {
    return subtotalArr.reduce((total, current) => {
      return total + current;
    }, 0);
  };

  //Sorts the Line Items
  cart.lineItems.sort(function (a, b) {
    return a.id - b.id;
  });
  return {
    lineItems: cart.lineItems || [],
    subtotal: calculateSum().toFixed(2),
    auth: state.auth,
  };
};
const mapDispatch = (dispatch) => {
  return {
    increment: (lineItem, dir) => null,
    //   const item = { ...lineItem, quantity: lineItem.quantity + dir };
    //   dispatch(updateLineItem(item));
    // },
    deleteLineItem: (lineItem) => null,
    //   const item = { ...lineItem, quantity: 0 };
    //   dispatch(updateLineItem(item));
    // },
  };
};
export default connect(mapState, mapDispatch)(OrderCompleted);

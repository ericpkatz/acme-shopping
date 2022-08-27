import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateCartToOrder } from "./store";

const OrderCompleted = ({ lineItems, subtotal, orderCart }) => {

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
          {lineItems.map((lineItem) => {
            let subtotal = lineItem.product.price * lineItem.quantity;
            return (
              <tr key={lineItem.id}>
                <td>
                  <img src={lineItem.product.imgUrl} width="120" height="80" />
                </td>
                <td>{lineItem.product.name}</td>
                <td>{lineItem.quantity}</td>
                <td>${lineItem.product.price}</td>
                <td>${subtotal && subtotal.toFixed(2)}</td>
                <td></td>
              </tr>
            );
          })}
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Total: ${subtotal}</th>
            <th>
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
    auth,
  };
};
const mapDispatch = (dispatch) => {
  return {
    orderCart: (cart) => dispatch(updateCartToOrder(cart)),
  };
};
export default connect(mapState, mapDispatch)(OrderCompleted);

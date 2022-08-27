//this is referring to the cart referring to all the lineItems added to it?
import axios from "axios";
const cart = (state = { lineItems: [] }, action) => {
  if (action.type === "SET_CART") {
    return action.cart;
  } else if (action.type === "UPDATE_CART") {
    return action.item;
  }
  return state;
};
//get list of items added to cart but not submitted
export const fetchCart = () => {
  return async (dispatch) => {
    const cart = (
      await axios.get("/api/orders/cart", {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      })
    ).data;
    dispatch({ type: "SET_CART", cart });
  };
};
//add / update / delete items in cart
export const updateCart = (product, quantity) => {
  return async (dispatch) => {
    const item = (
      await axios.put(
        "/api/orders/cart",
        { product, quantity },
        {
          headers: {
            authorization: window.localStorage.getItem("token"),
          },
        }
      )
    ).data;
    dispatch({ type: "UPDATE_CART", item });
  };
};
//update cartItem
export const updateLineItem = (item) => {
  return async (dispatch) => {
    item = (
      await axios.put(`/api/orders/cart`, item, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      })
    ).data;
    dispatch({ type: "UPDATE_CART", item });
  };
};

export const updateCartToOrder = (cart) => {
  return async (dispatch) => {
    await axios.put(`/api/orders/cart/purchased`, {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    })
    window.href = `/orders/${cart.id}/completed`
  }
}

export default cart;

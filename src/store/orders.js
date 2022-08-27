//this is referring to the cart referring to all the lineItems added to it?
import axios from "axios";
const orders = (state = [], action) => {
  if (action.type === "SET_ORDERS") {
    return action.orders;
  }
  return state;
};

export const fetchOrders = () => {
  return async (dispatch) => {
    const orders = (
      await axios.get("/api/orders", {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      })
    ).data;
    dispatch({ type: "SET_ORDERS", orders });
  }
}

export const fetchUserOrders = () => {
  return async (dispatch) => {
    const orders = (
      await axios.get("/api/orders", {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      })
    ).data;
    dispatch({ type: "SET_ORDERS", orders });
  }
}

export default orders;

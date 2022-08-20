//this is referring to the cart referring to all the lineItems added to it?
import axios from "axios";
const cart = (state = { lineItems: [] }, action) => {
  if (action.type === "SET_CART") {
    return action.cart;
  } else if (action.type === "CREATE_CART_ITEM") {
    return action.item;
  } else if (action.type === "UPDATE_CART_ITEM") {
    return { ...state, lineItems: action.item.lineItems };
  } else if (action.type === "DELETE_CART_ITEM") {
    console.log(action.item);
    return { ...state, lineItems: action.item.lineItems };
  }
  return state;
};
// const cart = (state = { lineItems: [] }, action) => {
//   if (action.type === "SET_CART") {
//     return action.cart;
//   } else if(action.type === 'CREATE_CART_ITEM'){
//     return action.item;
//   } else if(action.type === 'UPDATE_CART_ITEM'){
//     return state.map(item => item.id === action.item.id ? action.item : item);
//   } else if(action.type === 'DELETE_CART_ITEM'){
//     return state.filter(item => item.id !== action.item.id);
//   }
//   return state;
// };
//get list of items added to cart but not submitted
export const fetchCart = ()=> {
  return async(dispatch)=> {
    const cart = (await axios.get('/api/orders/cart', {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    })).data;
    dispatch({ type: 'SET_CART', cart});
  }
};
//create cartItem
export const addToCart = (product, quantity) => {
  return async(dispatch) => {
    const item = (await axios.put('/api/orders/cart',{product, quantity}, {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    })).data;
    dispatch({type: 'CREATE_CART_ITEM', item});
  }
};
//update cartItem
export const updateCartItem = (item) => {
  return async (dispatch) => {
    item = (
      await axios.put(`/api/orders/cart`, item, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      })
    ).data;
    dispatch({ type: "UPDATE_CART_ITEM", item });
  };
};

export const deleteCartItem = (item) => {
  return async (dispatch) => {
    item = (
      await axios.put("/api/orders/cart/", item, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      })
    ).data;
    dispatch({ type: "DELETE_CART_ITEM", item });
  };
};

export default cart;

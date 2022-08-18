//this is referring to the cart referring to all the lineItems added to it?
import axios from 'axios';
const cart = (state = { lineItems: [] }, action)=> {
  if(action.type === 'SET_CART'){
    return action.cart;
  } else if(action.type === 'ADD_TO_CART'){
    return [...state, action.item];
  } else if(action.type === 'UPDATE_CART_ITEM'){
    return state.map(item => item.id === action.item.id ? action.item : item);
  } else if(action.type === 'DELETE_CART_ITEM'){
    return state.filter(item => item.id !== action.item.id);
  }
  return state;
};
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
//add item to cart
export const addToCart = ( productId, quantity) => {
  return async(dispatch) => {
    const item = (await axios.put('/api/orders/cart',{productId: productId, quantity: quantity*1}, {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    })).data;
    dispatch({type: 'ADD_TO_CART', item});
  }
};
//update cartItem
export const updateCartItem = ( currentOrder, cartItem, quantity, product) => {
  return async(dispatch) => {
    const item = (await axios.put(`/api/orders/cart/${cartItem.id}`, {
      quantity,
      productId: product.id,
      orderId:  currentOrder.id
    }, {
      headers: {
        authorization: token
      }
    })).data;
    dispatch({type: 'UPDATE_CART_ITEM', item})
  }
};

export default cart;
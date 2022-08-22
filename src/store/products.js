//this is referring to products table
import axios from 'axios';

const products = (state = [], action) => {
    if(action.type === 'SET_PRODUCTS'){
        return action.products;
    }
    else if(action.type === 'CREATE_PRODUCT'){
        return [...state, action.product];
    }
    else if(action.type === 'UPDATE_PRODUCT'){
        return state.map(product => product.id === action.product.id ? action.product : product);
    }
    else if(action.type === 'DELETE_PRODUCT'){
        return state.filter(product => product.id !== action.product.id);
    }
    return state;
}
//get all products
export const fetchProducts = ()=> {
    return async(dispatch)=> {
      const products = (await axios.get('/api/products', {
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      })).data;
      dispatch({ type: 'SET_PRODUCTS', products});
    }
  };
//create product
export const createProduct = (product) => {
    return async(dispatch) => {
        product = (await axios.post('/api/products', product, {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })).data;
        dispatch({type: 'CREATE_PRODUCT', product});
    }
};
//update product
export const updateProduct = (product) => {
    return async(dispatch) => {
        product = (await axios.put(`/api/products/${product.id}`, product, {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })).data;
        dispatch({type: 'UPDATE_PRODUCT', product});
    }
};
//delete product
export const deleteProduct = (product) => {
    return async(dispatch) => {
        await axios.delete(`/api/products/${product.id}`, {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        });
        dispatch({type: 'DELETE_PRODUCT', product});
    }
};

export default products;
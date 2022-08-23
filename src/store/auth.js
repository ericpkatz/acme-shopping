import axios from 'axios';
/*
const auth = (state = {}, action)=> {
  switch (action.type) {
    case 'SET_AUTH':
    return state=action.auth;
    case 'UPDATE_AUTH':
    return {...state, auth:action.auth};
    default:
    return state
  }
};
*/
const auth = (state = {}, action)=> {
  if(action.type === 'SET_AUTH'){
    state = action.auth;
  }
  return state;
};


export const logout = ()=> {
  return (dispatch)=> {
    window.localStorage.removeItem('token');
    dispatch({ type: 'SET_AUTH', auth: {}});
  };
};

export const exchangeToken = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.get('/api/sessions', {
        headers: {
          authorization: token
        }
      });
      const auth = response.data;
      dispatch({ auth, type: 'SET_AUTH'});
    }
  };
};
export const login = (credentials)=> {
  return async(dispatch)=> {
    let response = await axios.post('/api/sessions', credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token); 
    response = await axios.get('/api/sessions', {
      headers: {
        authorization: token
      }
    });
    const auth = response.data;
    dispatch({ auth, type: 'SET_AUTH'});

  };
};

export const createAccount = (information) => {
  return async(dispatch) => {
    let user = (await axios.post('/api/sessions/user', information)).data;
    const {token} = user;
    window.localStorage.setItem('token', token)
    dispatch(login(user));
  }
};

export const updateUser = (information) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(`/api/sessions/user`, information, {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        });
    dispatch({ updated, type: 'SET_AUTH'});
  };
};

export default auth;
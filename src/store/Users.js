import axios from 'axios';

const users = (state = [], action) => {
    if(action.type === 'SET_USERS'){
        return action.users;
    }
    return state;
}
//get users
export const fetchUsers = ()=> {
    return async(dispatch)=> {
      const users = (await axios.get('/api/users', {
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      })).data;
      dispatch({ type: 'SET_USERS', users});
    }
  };
export default users;
import axios from "axios";

const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    state = action.auth;
  }
  return state;
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("token");
    dispatch({ type: "SET_AUTH", auth: {} });
  };
};

export const exchangeToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/sessions", {
        headers: {
          authorization: token,
        },
      });
      const auth = response.data;
      dispatch({ auth, type: "SET_AUTH" });
    }
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    let response = await axios.post("/api/sessions", credentials);
    const { token } = response.data;
    window.localStorage.setItem("token", token);
    response = await axios.get("/api/sessions", {
      headers: {
        authorization: token,
      },
    });
    const auth = response.data;
    dispatch({ auth, type: "SET_AUTH" });
  };
};

export const createGuestAccount = (credentials) => {
  return async (dispatch) => {
    const guest = (await axios.post("/api/sessions/guest")).data;
    if (guest) {
      let response = await axios.post("/api/sessions", credentials);
      const { token } = response.data;
      console.log(response.data);
      window.localStorage.setItem("token", token);
      response = await axios.get("/api/sessions", {
        headers: {
          authorization: token,
        },
      });
      const auth = response.data;
      dispatch({ auth, type: "SET_AUTH" });
    }
  };
};

export const createAccount = (information) => {
  return async (dispatch) => {
    let user = (await axios.post("/api/sessions/user", information)).data;
    const { token } = user;
    window.localStorage.setItem("token", token);
    dispatch(login(user));
  };
};

export const updateUserCredential = (information) => {
  return async (dispatch) => {
    let user = await axios.put(`/api/sessions/user/credential`, information, {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    }).data;
    console.log(user);
    const { token } = user;
    window.localStorage.setItem("token", token);
    dispatch(login(user));
    //  dispatch({ user, type: 'SET_AUTH'});
  };
};

//===============================
export const updateGuestToUser = (guest, updateInfo) => {
  return async (dispatch) => {
    console.log(guest);
    console.log(updateInfo);
    //update guess with update info
    const newUser = (await axios.put(`/api/sessions/guest`, updateInfo)).data;
    const newUserCredentials = { ...newUser, password: updateInfo.password };

    // ==== log in
    let response = await axios.post("/api/sessions", newUserCredentials);
    const { token } = response.data;
    window.localStorage.setItem("token", token);
    response = await axios.get("/api/sessions", {
      headers: {
        authorization: token,
      },
    });
    const auth = response.data;
    dispatch({ auth, type: "SET_AUTH" });
  };
};

export const updateUser = (information) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(
      `/api/sessions/user`,
      information,
      {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      }
    );
    dispatch({ updated, type: "SET_AUTH" });
  };
};

export default auth;

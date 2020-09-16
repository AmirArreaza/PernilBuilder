import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_START_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_START_FAILED,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYwrMeit8CXZob_HzkOzm3LtR8e01KjGc";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYwrMeit8CXZob_HzkOzm3LtR8e01KjGc";
    }

    try {
      const response = await axios.post(url, authData);
      console.log(response);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
      console.log("Error: ", error.response);
      dispatch(authFailed(error.response.data.error));
    }
  };
};

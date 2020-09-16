import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_START_SUCCESS,
    authData: authData,
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_START_FAILED,
    error: error,
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
      dispatch(authSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(authFailed(error));
    }
  };
};

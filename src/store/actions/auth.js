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

export const auth = (email, password) => { 
  return async (dispatch) => { 
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYwrMeit8CXZob_HzkOzm3LtR8e01KjGc",
        authData
      );
      console.log(response);
      dispatch(authSuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(authFailed(error));
    }
  };
};

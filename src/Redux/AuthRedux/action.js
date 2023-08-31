import axios from "axios";
import * as authActionTypes from "../ActionType";
import { removeData, setData } from "../../Utilities/Localstorage/ls";

export const loginSuccess = (userslogedin) => {
  return {
    type: authActionTypes.LOGIN_SUCCESS,
    payload: userslogedin,
  };
};

export const loginFailure = (error) => {
  return {
    type: authActionTypes.LOGIN_FAILURE,
    payload: error,
  };
};

export const signupSuccess = () => {
  return {
    type: authActionTypes.SIGNUP_SUCCESS,
  };
};

export const signupFailure = (error) => {
  return {
    type: authActionTypes.SIGNUP_FAILURE,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: authActionTypes.LOGOUT,
  };
};

export const loginUser = (username, password) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://twitter-clone-8kdy.onrender.com/auth/login",
      { username, password }
    );
    console.log(res.data);

    dispatch(loginSuccess(res.data));
   
    setData("token", res.data.token);
    setData("userId", res.data.userId);
    setData("name", res.data.name);
    setData("username", res.data.username);
    setData("avatar", res.data.avatar);
  } catch (error) {
    console.log(error.res.data.error);
    dispatch(loginFailure(error.res));
  }
};

export const signupUser = (userData) => async (dispatch) => {
  try {
    let res = await axios.post(
      "https://twitter-clone-8kdy.onrender.com/auth/register",
      userData
    );
    dispatch(signupSuccess());
    console.log(res.data);
  } catch (error) {
    dispatch(signupFailure(error.response.data.error));
    console.log(error.response.data.error);
  }
};

export const logoutuser = () => (dispatch) => {

  dispatch(logout()); // Dispatch the logout action to update the Redux store
  removeData("token");
  removeData("userId");
  removeData("name");
  removeData("username");
  removeData("avatar");
};

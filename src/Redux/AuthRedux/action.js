import axios from "axios";
import * as authActionTypes from "../ActionType";
import { removeData, setData } from "../../Utilities/Localstorage/ls";
import { toast } from "react-hot-toast";

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

export const loginUser = (username, password,navigate) => (dispatch) => {
  axios
    .post("https://twitter-clone-8kdy.onrender.com/auth/login", {
      username,
      password,
    })
    .then((response) => {
      dispatch(loginSuccess(response.data));
      setData("token", response.data.token);
      setData("userId", response.data.userId);
      setData("name", response.data.name);
      setData("username", response.data.username);
      setData("avatar", response.data.avatar);
      toast.success("Logged in successfully!", {
        style: {
          borderRadius: "50px",
          background: "#989898",
          color: "#ffffff",
          padding: "1rem 1.5rem",
          fontWeight: "600",
        },
      });
      navigate("/tweet")
    })
    .catch((error) => {
      console.log(error.message);
      dispatch(loginFailure(error.message));
      toast.error(error.response.data.msg, {
        style: {
          borderRadius: "50px",
          background: "#989898",
          color: "#ffffff",
          padding: "1rem 1.5rem",
          fontWeight: "600",
        },
      });
    });
};

export const signupUser = (userData,navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://twitter-clone-8kdy.onrender.com/auth/register",
      userData
    );

    
    dispatch(signupSuccess(response.data)); // Dispatch success action with response data
    console.log(response.data);
    toast.success("User Registerd successfully!", {
      style: {
        borderRadius: "50px",
        background: "#989898",
        color: "#ffffff",
        padding: "1rem 1.5rem",
        fontWeight: "600",
      },
    });
    navigate("/login")
  } catch (error) {
    
    dispatch(signupFailure(error.response.data.error)); // Dispatch failure action with error data
    console.error(error.response.data.error);
    dispatch(loginFailure(error.message));
    toast.error(error.response.data.msg, {
      style: {
        borderRadius: "50px",
        background: "#989898",
        color: "#ffffff",
        padding: "1rem 1.5rem",
        fontWeight: "600",
      },
    });
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

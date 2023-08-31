import { getData } from "../../Utilities/Localstorage/ls";
import * as authActionTypes from "../ActionType";

let token = getData("token");
let userId = getData("userId");
let name = getData("name");
let username = getData("username");
let avatar = getData("avatar");

const initialState = {
  token: token || "",
  isAuth: token ? true : false,
  username: username || "",
  name: name || "",
  error: false,
  loading: false,
  userId: userId || "",
  avatar: avatar || "",
  userslogedin: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
        name: action.payload.name,
        userId: action.payload.userId,
        avatar:action.payload.avatar,
        error: false,
        loading:false,
        isAuth:true,
        userslogedin: action.payload,
      };
    case authActionTypes.LOGIN_FAILURE:
    case authActionTypes.SIGNUP_FAILURE:
    case authActionTypes.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        username: "",
        name: "",
        userId: "",
        error: action.payload,
        isAuth:false,
        avatar:"",
      };
    case authActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

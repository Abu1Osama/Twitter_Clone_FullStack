// redux/actions.js
import axios from "axios";
import * as actionTypes from "../ActionType";
import { getData } from "../../Utilities/Localstorage/ls";

export const fetchUserSuccess = (user) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: actionTypes.FETCH_USER_FAILURE,
  payload: error,
});
export const getAllUsersSuccess = (users) => ({
  type: actionTypes.GET_ALL_USERS_SUCCESS,
  payload: users,
});

export const getAllUsersFailure = (error) => ({
  type: actionTypes.GET_ALL_USERS_FAILURE,
  payload: error,
});

export const followUserSuccess = (userId) => ({
  type: actionTypes.FOLLOW_USER_SUCCESS,
  payload: userId,
});

export const followUserFailure = (error) => ({
  type: actionTypes.FOLLOW_USER_FAILURE,
  payload: error,
});

export const unfollowUserSuccess = (userId) => ({
  type: actionTypes.UNFOLLOW_USER_SUCCESS,
  payload: userId,
});

export const unfollowUserFailure = (error) => ({
  type: actionTypes.UNFOLLOW_USER_FAILURE,
  payload: error,
});

export const fetchUser = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://twitter-clone-8kdy.onrender.com/users/getUser/${userId}`
    );
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserFailure(error.response.data.error));
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://twitter-clone-8kdy.onrender.com/users/getAllUsers`
    );
    dispatch(getAllUsersSuccess(response.data)); // Assuming response.data is an array of user objects
  } catch (error) {
    dispatch(getAllUsersFailure(error.response.data.error));
  }
};
export const followUser = (userId) => async (dispatch) => {
  try {
   
    const headers = {
      Authorization: `Bearer ${getData("token")}`,
    };

    await axios.post(
      `https://twitter-clone-8kdy.onrender.com/users/followUser/${userId}`,
      null, // You can pass null as the request body if you're not sending any data
      { headers } // Include the headers in the config object
    );

    dispatch(followUserSuccess(userId));
  } catch (error) {
    dispatch(followUserFailure(error.response.data.error));
    console.log(error.response.data.error);
  }
};

export const unfollowUser = (userId) => async (dispatch) => {
  try {
   
    const headers = {
      Authorization: `Bearer ${getData("token")}`,
    };
    await axios.post(
      `https://twitter-clone-8kdy.onrender.com/users/unfollowUser/${userId}`, null,{headers},
    );
    dispatch(unfollowUserSuccess(userId));
  } catch (error) {
    dispatch(unfollowUserFailure(error.response.data.error));
  }
};

export const editProfileSuccess = (updatedUser) => ({
  type: actionTypes.EDIT_PROFILE_SUCCESS,
  payload: updatedUser,
});

export const editProfileFailure = (error) => ({
  type: actionTypes.EDIT_PROFILE_FAILURE,
  payload: error,
});

export const editProfile = (userId, profileData) => async (dispatch) => {
  try {

    const headers = {
      Authorization: `Bearer ${getData("token")}`,
    };

    const response = await axios.patch(
      `https://twitter-clone-8kdy.onrender.com/users/editUser/${userId}`,
      profileData,
      { headers }
    );
console.log(response.data)
    dispatch(editProfileSuccess(response.data));
  } catch (error) {
    dispatch(editProfileFailure(error.response.data.error));
    console.log(error.response.data.error)
  }
};

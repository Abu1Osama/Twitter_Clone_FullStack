// chatActions.js

import { getData } from "../../Utilities/Localstorage/ls";
import * as actionTypes from "../ActionType";


import axios from "axios";

export const sendMessage = (message) => {
  return {
    type: actionTypes.SEND_MESSAGE,
    payload: message,
  };
};

export const receiveMessage = (message) => {
  return {
    type: actionTypes.RECEIVE_MESSAGE,
    payload: message,
  };
};

// Asynchronous action to send a message
export const sendChatMessage = (message) => {
  return async (dispatch) => {
    const headers = {
        Authorization: `Bearer ${getData("token")}`,
      };
    try {
      // Send the message to the server using Axios
      const response = await axios.post("https://twitter-clone-8kdy.onrender.com/messages/send", message,{ headers });

      // Dispatch the sendMessage action with the received message from the server
      dispatch(sendMessage(response.data));
    } catch (error) {
      // Handle error, e.g., dispatch an error action
      console.error("Error sending message:", error);
      console.log(error.response.data.msg)
    }
  };
};

// Asynchronous action to receive messages (e.g., in a chat room)
export const receiveChatMessages = (userId) => {
  return async (dispatch) => {
    const headers = {
        Authorization: `Bearer ${getData("token")}`,
      };
    try {
      // Fetch messages from the server using Axios
      const response = await axios.get(`https://twitter-clone-8kdy.onrender.com/messages/user/${userId}`,{ headers });

      // Dispatch the receiveMessage action with the received messages from the server
      response.data.forEach((message) => {
        dispatch(receiveMessage(message));
      });
    } catch (error) {
      // Handle error, e.g., dispatch an error action
      console.error("Error receiving messages:", error);
    }
  };
};


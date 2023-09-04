// chatReducer.js

import * as actionTypes from "../ActionType";

const initialState = {
  messages: [],
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_MESSAGE:
      // Add the sent message to the state
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case actionTypes.RECEIVE_MESSAGE:
      // Add the received message to the state
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    default:
      return state;
  }
};


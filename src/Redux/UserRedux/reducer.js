// redux/reducers.js
import * as actionTypes from '../ActionType';

const initialState = {
  token: null,
  username: null,
  name: null,
  userId: null,
  followers: [], // Add followers field
  error: null,
  users: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUCCESS:
    
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    case actionTypes.FETCH_USER_FAILURE:
    case actionTypes.FOLLOW_USER_FAILURE:
    case actionTypes.UNFOLLOW_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.FOLLOW_USER_SUCCESS:
      return {
        ...state,
        followers: [...state.followers, action.payload],
        error: null,
      };
    case actionTypes.UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        followers: state.followers.filter(id => id !== action.payload),
        error: null,
      };
      case actionTypes.GET_ALL_USERS_SUCCESS:
        return {
          ...state,
          users: action.payload, // Assuming action.payload is an array of user objects
          error: null,
        };
      case actionTypes.GET_ALL_USERS_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
        case actionTypes.EDIT_PROFILE_SUCCESS:
          const updatedUsers = state.users.map((user) =>
            user._id === action.payload._id ? action.payload : user
          );
          return { ...state, users: updatedUsers, error: null };
        case actionTypes.EDIT_PROFILE_FAILURE:
          return { ...state, error: action.payload };
    
        
    // ... other cases
    default:
      return state;
  }
};

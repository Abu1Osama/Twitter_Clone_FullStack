// tweetReducer.js
import * as tweetActionTypes from "../ActionType";

const initialState = {
  tweet: [],
  error: null,
  allTweetsWithProfiles: [],
  timelineTweets: []
};

export const tweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case tweetActionTypes.CREATE_TWEET_SUCCESS:
    case tweetActionTypes.GET_TWEET_SUCCESS:
    case tweetActionTypes.EDIT_TWEET_SUCCESS:
      return {
        ...state,
        tweet: action.payload,
        error: null,
      };
    case tweetActionTypes.CREATE_TWEET_FAILURE:
    case tweetActionTypes.GET_TWEET_FAILURE:
    case tweetActionTypes.EDIT_TWEET_FAILURE:
    case tweetActionTypes.DELETE_TWEET_FAILURE:
      return {
        ...state,
        tweet: [],
        error: action.payload,
      };
    case tweetActionTypes.GET_ALL_TWEETS_WITH_PROFILES_SUCCESS:
      return {
        ...state,
        allTweetsWithProfiles: action.payload,
        error: null,
      };
    case tweetActionTypes.GET_ALL_TWEETS_WITH_PROFILES_FAILURE:
      return {
        ...state,
        allTweetsWithProfiles: [],
        error: action.payload,
      };
    case tweetActionTypes.DELETE_TWEET_SUCCESS:
      return {
        ...state,
        tweet: [],
        error: null,
      };
      
    case tweetActionTypes.GET_TIMELINE_SUCCESS:
      return {
        ...state,
        timelineTweets: action.payload,
        error: null,
      };
    case tweetActionTypes.GET_TIMELINE_FAILURE:
      return {
        ...state,
        timelineTweets: [],
        error: action.payload,
      };
     
    default:
      return state;
  }
};

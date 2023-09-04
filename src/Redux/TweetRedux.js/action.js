// tweetActions.js
import axios from "axios";
import * as tweetActionTypes from "../ActionType";
import { getData } from "../../Utilities/Localstorage/ls";
import { toast } from "react-hot-toast";

export const createTweetSuccess = (tweet) => ({
  type: tweetActionTypes.CREATE_TWEET_SUCCESS,
  payload: tweet,
});

export const createTweetFailure = (error) => ({
  type: tweetActionTypes.CREATE_TWEET_FAILURE,
  payload: error,
});

export const getTweetSuccess = (tweet) => ({
  type: tweetActionTypes.GET_TWEET_SUCCESS,
  payload: tweet,
});

export const getTweetFailure = (error) => ({
  type: tweetActionTypes.GET_TWEET_FAILURE,
  payload: error,
});

export const editTweetSuccess = (tweet) => ({
  type: tweetActionTypes.EDIT_TWEET_SUCCESS,
  payload: tweet,
});

export const editTweetFailure = (error) => ({
  type: tweetActionTypes.EDIT_TWEET_FAILURE,
  payload: error,
});

export const deleteTweetSuccess = () => ({
  type: tweetActionTypes.DELETE_TWEET_SUCCESS,
});

export const deleteTweetFailure = (error) => ({
  type: tweetActionTypes.DELETE_TWEET_FAILURE,
  payload: error,
});
export const getAllTweetsWithProfilesSuccess = (tweets) => ({
  type: tweetActionTypes.GET_ALL_TWEETS_WITH_PROFILES_SUCCESS,
  payload: tweets,
});

export const getAllTweetsWithProfilesFailure = (error) => ({
  type: tweetActionTypes.GET_ALL_TWEETS_WITH_PROFILES_FAILURE,
  payload: error,
});
export const getTimelineSuccess = (tweets) => ({
  type: tweetActionTypes.GET_TIMELINE_SUCCESS,
  payload: tweets,
});

export const getTimelineFailure = (error) => ({
  type: tweetActionTypes.GET_TIMELINE_FAILURE,
  payload: error,
});

export const createTweet =(content, formData) => async (dispatch) => {
    try {
      const headers = {
        Authorization: `Bearer ${getData("token")}`,
      };

      const response = await axios.post(
        "https://twitter-clone-8kdy.onrender.com/tweets/createTweet",
        formData,
        { headers, withCredentials: true }
      );
      console.log(response.data)
      dispatch(createTweetSuccess(response.data));
    } catch (error) {
      console.log(error.response.data);
      dispatch(createTweetFailure(error.response.data.error));
    }
  };
export const getuserTweet = () => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${getData("token")}`,
    };

    const response = await axios.get(
      `https://twitter-clone-8kdy.onrender.com/tweets/userTweets`,
      { headers }
    );
    console.log(response.data)
    dispatch(getTweetSuccess(response.data));
  } catch (error) {
    dispatch(getTweetFailure(error.response.data.error));
  }
};


export const editTweet = (tweetId, content) => async (dispatch) => {
  try {
    const token=   localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.put(
      `https://twitter-clone-8kdy.onrender.com/tweets/${tweetId}/edit`,
      { content },
      { headers }
    );
    dispatch(editTweetSuccess(response.data));
  } catch (error) {
    dispatch(editTweetFailure(error.response.data.error));
  }
};

export const getAllTweetsWithProfiles = () => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${getData("token")}`,
    };

    const response = await axios.get(
      "https://twitter-clone-8kdy.onrender.com/tweets/allTweetsWithProfiles",
      { headers }
    );
    console.log(response.data)
    dispatch(getAllTweetsWithProfilesSuccess(response.data));
  } catch (error) {
    dispatch(getAllTweetsWithProfilesFailure(error.response.data.error));
  }
};
export const getTimeline = () => async (dispatch) => {
  try {
   
    const headers = {
      Authorization: `Bearer ${getData("token")}`,
    };

    const response = await axios.get(
      "https://twitter-clone-8kdy.onrender.com/timeline",
      { headers }
    );
    console.log(response.data)
    dispatch(getTimelineSuccess(response.data));
  } catch (error) {
    dispatch(getTimelineFailure(error.response.data.error));
  }
};

export const deleteTweet = (tweetId) => async (dispatch) => {
  try {
   
    const headers = {
      Authorization: `Bearer ${getData("token")}`,
    };

    await axios.delete(
      `https://twitter-clone-8kdy.onrender.com/tweets/${tweetId}/delete`,
      { headers }
    );
    dispatch(deleteTweetSuccess());
    toast.success("Post Deleted successfully!", {
      style: {
        borderRadius: "50px",
        background: "#989898",
        color: "#ffffff",
        padding: "1rem 1.5rem",
        fontWeight: "600",
      },
    });
  } catch (error) {
    dispatch(deleteTweetFailure(error.response.data.error));
  }
};

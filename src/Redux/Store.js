import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import {authReducer} from "../Redux/AuthRedux/reducer"
import {userReducer} from "../Redux/UserRedux/reducer"
import {tweetReducer} from "../Redux/TweetRedux.js/reducer"

const rootReducer = combineReducers({
    auth: authReducer,
    user:userReducer,
    tweet:tweetReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

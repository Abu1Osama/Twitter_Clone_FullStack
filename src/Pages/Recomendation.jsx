import React, { useEffect, useState } from "react";
import "../Style/Recomendation.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  unfollowUser,
  getAllUsers,
} from "../Redux/UserRedux/action";
import { getTimeline } from "../Redux/TweetRedux.js/action";

function Recomendation() {
  const users = useSelector((state) => state.user.users);
  const followedUsers = useSelector((state) => state.user.followers);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState({});

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getTimeline());
  }, [dispatch]);

  useEffect(() => {
    // Load button text from localStorage
    const savedButtonText = JSON.parse(localStorage.getItem("buttonText")) || {};
    setButtonText(savedButtonText);
  }, []);

  const handleFollowToggle = (id) => {
    const isCurrentlyFollowed = buttonText[id] === "Unfollow";

    if (isCurrentlyFollowed) {
      dispatch(unfollowUser(id));
      // Remove the button text from state and localStorage when unfollowed
      const updatedButtonText = { ...buttonText };
      delete updatedButtonText[id];
      setButtonText(updatedButtonText);
    } else {
      dispatch(followUser(id));
      setButtonText({ ...buttonText, [id]: "Unfollow" });
    }

    dispatch(getTimeline());
    
    // Save button text to localStorage
    localStorage.setItem("buttonText", JSON.stringify(buttonText));
  };

  const filteredUsers = users.filter((user) => user._id !== userId);

  return (
    <div className="mine" id="mine">
      <div className="card-main">
        <h2>Who to follow</h2>
        {filteredUsers.map((item) => (
          <div className="main-data" key={item._id}>
            <div className="image">
              <img
                width={"30px"}
                src={`https://twitter-clone-8kdy.onrender.com/avatars/${item.avatar}`}
                alt=""
              />
            </div>
            <div className="content">
              <p>{item.name}</p>
              <p>{item.username}</p>
            </div>
            <div className="btn">
              <button onClick={() => handleFollowToggle(item._id)}>
                {buttonText[item._id] ||
                  (followedUsers.includes(item._id) ? "Unfollow" : "Follow")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recomendation;

import React, { useEffect } from "react";
import "../Style/Recomendation.scss";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser, getAllUsers } from "../Redux/UserRedux/action";
import { getTimeline } from "../Redux/TweetRedux.js/action";

function Recomendation() {
  const users = useSelector((state) => state.user.users);
  const followedUsers = useSelector((state) => state.user.followers); // Assuming you have a state for followed users
  const userId = useSelector((state) => state.auth.userId);
  console.log(userId)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getTimeline())
  }, [dispatch]);

  const handleFollowToggle = (id) => {
    if (followedUsers.includes(id)) {
      dispatch(unfollowUser(id));
    } else {
      dispatch(followUser(id));
    }
    dispatch(getTimeline());
   
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
                {followedUsers.includes(item._id) ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
   
  );
}

export default Recomendation;

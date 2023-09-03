import React, { useEffect, useState } from "react";
import "../Style/Homepage.scss";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo_t.png";
import {
  getAllTweetsWithProfiles,
  getTimeline,
  getuserTweet,
} from "../Redux/TweetRedux.js/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faBell } from "@fortawesome/free-solid-svg-icons";
import {
  followUser,
  getAllUsers,
  unfollowUser,
} from "../Redux/UserRedux/action";
import { Link } from "react-router-dom";
import PostCard from "../Components/PostCard";

function Homepage({ toggleCardPosition }) {
  const [isPostPopupOpen, setIsPostPopupOpen] = useState(false);
  const tweett = useSelector((state) => state.auth);
  const [unfollowActive, setUnfollowActive] = useState(false);
  let { allTweetsWithProfiles, timelineTweets } = useSelector(
    (store) => store.tweet
  );
  console.log(timelineTweets)
  const togglePostPopup = () => {
    setIsPostPopupOpen(!isPostPopupOpen);
  };
  // console.log(timelineTweets)
  const users = useSelector((state) => state.user.users);
  const users2 = useSelector((state) => state.user.userwithid);
  console.log(users)
  const self = useSelector((state) => state.auth);
  console.log(self.userId)
  const loginusersdata=users.filter((item)=>item._id===self.userId)
  console.log(loginusersdata)
  const followerIds = loginusersdata[0]?.followers || [];
  console.log(followerIds)
  const [activeTab, setActiveTab] = useState("forYou");
  const dispatch = useDispatch();
  // console.log(users);

  useEffect(
    (userId) => {
      dispatch(getAllTweetsWithProfiles());
      dispatch(getTimeline());
      dispatch(getuserTweet());
      dispatch(getAllUsers());
      dispatch(followUser());
    },
    [dispatch]
  );

  const handleUnfollow = (userId) => {
    dispatch(unfollowUser(userId));
    setUnfollowActive(false);
  };

  
  return (
    <div className="homepage" id="homepage">
      <div className="begin start">
        <div>
          <img  onClick={toggleCardPosition} className="logo" src={`https://twitter-clone-8kdy.onrender.com/avatars/${self.avatar}`} alt="abu" />
        </div>
        <div>
          <img className="ico" src={logo} alt="" />
        </div>
        <div></div>
      </div>
      <div className="top-section">
        <h2>Home</h2>
        <div className="tab">
          <p
            className={activeTab === "forYou" ? "active" : ""}
            onClick={() => setActiveTab("forYou")}
          >
            For you
          </p>
          <p
            className={activeTab === "following" ? "active" : ""}
            onClick={() => setActiveTab("following")}
          >
            Following
          </p>
        </div>
      </div>
      <div
        className="data"
        style={{ display: activeTab === "forYou" ? "block" : "none" }}
      >
        {allTweetsWithProfiles.map((item) => {
          const authorUser = users.find((user) => user._id === item.author._id);
          // console.log(authorUser.avatar)
          return (
            <div className="show-tweets" key={item._id}>
              <div className="user-image">
                <img
                  src={`https://twitter-clone-8kdy.onrender.com/avatars/${authorUser.avatar}`}
                  alt=""
                />
              </div>
              <div className="user-data">
                <div className="top">
                  <div className="private">
                    <strong>{item.author.name}</strong>
                    <p>{item.author.username}</p>
                    <p>Aug 21</p>
                  </div>
                  <div className="action">
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </div>
                </div>
                <div className="bottom">
                  <p>{item.content}</p>
                  {item.image && ( // Check if there's an image
                    <img
                      src={
                        `https://twitter-clone-8kdy.onrender.com/uploads/` +
                        item.image
                      }
                      alt="sam"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}

       
      </div>
      <div
        className="following"
        style={{ display: activeTab === "following" ? "block" : "none" }}
      >
        {timelineTweets
          .filter((item) =>followerIds.includes(item.author._id)) // Filter based on followed users
          .map((item) => {
            const authorUser = users.find(
              (user) => user._id === item.author._id
              ); // Find the corresponding user object
              console.log(authorUser)
            return (
              <div className="show-tweets">
                <div className="user-image">
                  <img
                    src={`https://twitter-clone-8kdy.onrender.com/avatars/${authorUser.avatar}`}
                    alt=""
                  />
                </div>
                <div className="user-data">
                  <div className="top">
                    <div className="private">
                      <strong>
                        {authorUser ? authorUser.name : item.author.name}
                      </strong>
                      <p>{item.author.username}</p>
                      <p>Aug 21</p>
                    </div>
                    <div className="action timeline">
                      <FontAwesomeIcon
                        className="unfollowaction"
                        icon={faEllipsisH}
                        onClick={() => setUnfollowActive(!unfollowActive)}
                      />
                      {unfollowActive && (
                        <div className="unfollow">
                          <p onClick={() => handleUnfollow(item.author._id)}>
                            Unfollow
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bottom">
                    <p>{item.content}</p>
                    {item.image && ( // Check if there's an image
                      <img
                        src={
                          `https://twitter-clone-8kdy.onrender.com/uploads/` +
                          item.image
                        }
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div id="navbar-mob" className="navbar-mob">
        <ul>
          <li>
            <Link to="tweet">
              <i className={`fa-solid fa-house fa-2xl`}></i>
            </Link>
          </li>

          <li>
            <Link to="/tweet">
              <i
                style={{ background: "transparent" }}
                className={`fa-solid fa-magnifying-glass fa-2xl`}
              ></i>{" "}
            </Link>
          </li>
          <li>
            <Link to="/tweet">
              <i class="fa-regular fa-bell fa-2xl"></i>
            </Link>
          </li>
          <li>
            <Link to="/tweet">
              <i class="fa-regular fa-envelope fa-2xl"></i>
            </Link>
          </li>
        </ul>
      </div>
      {isPostPopupOpen && (
        <div className="post-popup">
          <PostCard onClose={togglePostPopup} />
        </div>
      )}
      <div className="post-btn"><button  onClick={togglePostPopup}>O</button></div>

     
    </div>
  );
}

export default Homepage;

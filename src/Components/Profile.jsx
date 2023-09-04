import React, { useEffect, useState } from "react";
import "../Style/Profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faArrowLeft,
  faEllipsisH,
  faReply,
  faRetweet,
  faHeart,
  faEye,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Redux/UserRedux/action";
import { deleteTweet, getuserTweet } from "../Redux/TweetRedux.js/action";
import Editprofile from "./Editprofile";
import { Link } from "react-router-dom";

function Profile({ setCurrentindex, setCurrentindex2 }) {
  const [profiletabindex, setProfiletabindex] = useState(0);
  const Profile = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user.userwithid);
  const followersCount = user && user.followers ? user.followers.length : 0;
  const [activeDeleteTweet, setActiveDeleteTweet] = useState(null);
  const usertweet = useSelector((state) => state.tweet.tweet);
  console.log(usertweet);

  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const profiletab = [
    {
      name: "Post",
      active: "none",
    },
    {
      name: "Replies",
      active: "none",
    },
    {
      name: "Highlights",
      active: "none",
    },
    {
      name: "Media",
      active: "none",
    },
    {
      name: "Likes",
      active: "none",
    },
  ];

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };
  const handleDeleteTweet = async (tweetId) => {
    try {
      await dispatch(deleteTweet(tweetId));
      dispatch(getuserTweet());
    } catch (error) {
      console.error("Error deleting tweet:", error);
    }
  };
  const handleToggleAfterAction = (tweetId) => {
    // Toggle the visibility of "after-action" menu for the specific tweet
    if (activeDeleteTweet === tweetId) {
      // If the clicked tweet's Delete button is already active, hide it
      setActiveDeleteTweet(null);
    } else {
      // Show the clicked tweet's Delete button
      setActiveDeleteTweet(tweetId);
    }
  };
  useEffect(() => {
    dispatch(fetchUser(`${Profile.userId}`));
    dispatch(getuserTweet());
  }, [Profile.userId]);

  const createdAtDate = new Date(user.createdAt);
  const monthYear = createdAtDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const goBack = () => {
    setCurrentindex(0);
    setCurrentindex2(6);
  };
  return (
    <>
      <div id="profile" className="profile">
        <div className="top">
          <div onClick={goBack}>
            {" "}
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div>
            <h4>{Profile.name}</h4>
            <p> Post</p>
            {/* <span>{post.length === 0 ? "0" : post.length}</span> */}
          </div>
        </div>
        <div className="profile-data">
          <div className="user-image">
            <img
              src={`https://twitter-clone-8kdy.onrender.com/avatars/${Profile.avatar}`}
              alt="img"
            />
          </div>
          <div className="data-top">
            <img
              src={
                "https://img.freepik.com/free-photo/beautiful-view-greenery-bridge-forest-perfect-background_181624-17827.jpg?w=2000"
              }
              alt=""
            />
          </div>
          <div className="data-bottom">
            <div className="edit">
              <button
                className="disabled"
                disabled={true}
                onClick={openEditModal}
              >
                Edit Profile
              </button>
            </div>
            <div className="user-name-data">
              <h2>{user.name}</h2>
              <span>{user.username}</span>
            </div>
            <div className="joined">
              <span>
                {" "}
                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{ marginRight: "5px" }}
                />
                <span> Joined {monthYear}</span>
              </span>
            </div>
            <div className="follwers">
              <div>
                <p>
                  {followersCount} <span>Following</span>
                </p>
              </div>
              <div>
                <p>
                  {followersCount} <span>Followers</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-tab">
          <div className="tab-card">
            {profiletab.map((item, index) => (
              <div
                className=""
                onClick={() => {
                  setProfiletabindex(index);
                }}
              >
                <img src={item.image} alt="" />
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          <div className="tab-card-data">
            {profiletabindex == 0 ? (
              usertweet && usertweet.length > 0 ? (
                <div className="tweets">
                  {usertweet &&
                    usertweet.map((item) => {
                      return (
                        <div className="show-tweets">
                          <div className="user-image">
                            <img
                              src={`https://twitter-clone-8kdy.onrender.com/avatars/${Profile.avatar}`}
                              alt=""
                            />
                          </div>
                          <div className="user-data">
                            <div className="top-data-profile">
                              <div className="private">
                                <strong>{user.name}</strong>
                                <p>{user.username}</p>
                                <p>Aug 21</p>
                              </div>
                              <div className="action">
                                <FontAwesomeIcon
                                  onClick={() =>
                                    handleToggleAfterAction(item._id)
                                  }
                                  icon={faEllipsisH}
                                />

                                {activeDeleteTweet === item._id && (
                                  <div className="after-action">
                                    <p
                                      onClick={() =>
                                        handleDeleteTweet(item._id)
                                      }
                                    >
                                      Delete
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
                                  alt="sam"
                                />
                              )}
                            </div>
                            <div className="response">
                              <i
                                class="fa-regular fa-comment"
                                style={{ color: " #a2a8b4" }}
                              ></i>
                              <i
                                class="fa-solid fa-retweet"
                                style={{ color: " #a2a8b4" }}
                              ></i>
                              <i
                                class="fa-regular fa-heart"
                                style={{ color: " #a2a8b4" }}
                              ></i>
                              <i
                                class="fa-solid fa-chart-simple"
                                style={{ color: " #a2a8b4" }}
                              ></i>
                              <i
                                class="fa-solid fa-arrow-up-from-bracket"
                                style={{ color: " #a2a8b4" }}
                              ></i>
                            </div>
                          </div>
                       
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="no-tweets">
                  <p>No tweets to display.</p>
                </div>
              )
            ) : profiletabindex == 1 ? (
              <div className="replies">
                <h1>Replies</h1>
              </div>
            ) : (
              <div className="likes"></div>
            )}
          </div>
        </div>
      </div>
      {showEditModal && (
        <Editprofile onClose={closeEditModal} userId={Profile.userId} />
      )}
    </>
  );
}

export default Profile;

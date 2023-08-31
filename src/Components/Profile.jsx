import React, { useEffect, useState } from "react";
import "../Style/Profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Redux/UserRedux/action";
import {  getuserTweet } from "../Redux/TweetRedux.js/action";
import Editprofile from "./Editprofile";

function Profile() {
  const Profile = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.tweet.tweet);
  // console.log(Profile.avatar)
  // console.log(post)
  // console.log(user);
  // console.log(post)
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
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
  return (
    <>

    <div id="profile" className="profile">
      <div className="top">
        <div>Go back</div>
        <div>
          <h4>{user.name}</h4>
          <p> Post</p>
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
            src={"https://img.freepik.com/free-photo/beautiful-view-greenery-bridge-forest-perfect-background_181624-17827.jpg?w=2000"}
            alt=""
          />
        </div>
        <div className="data-bottom">
          <div className="edit">
            <button className="disabled" disabled={true} onClick={openEditModal}>Edit Profile</button>
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
              {user.followers.length} <span>Following</span>
              </p>
            </div>
            <div>
              <p>
                {user.followers.length} <span>Followers</span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
     {showEditModal && <Editprofile onClose={closeEditModal} userId={Profile.userId}/>}

      </>
  );
}

export default Profile;

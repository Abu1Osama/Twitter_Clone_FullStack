import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo_t.png";
import {
  faHouse,
  faCompass,
  faBell,
  faEnvelope,
  faUsers,
  faCheckCircle,
  faUser,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import "../Style/Sidebar.scss";
import Home from "../Pages/Home";
import Homepage from "../Pages/Homepage";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";
import { logoutuser } from "../Redux/AuthRedux/action";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [currentindex, setCurrentindex] = useState(0);
  const loggedInUser = useSelector((state) => state.auth);
  
  const dispatch=useDispatch()
  const navigate=useNavigate()
  console.log(loggedInUser);
  const home = <i class="fa-solid fa-house"></i>;
  const iconMapping = {
    Home: faHouse,
    Explore: faCompass,
    Notification: faBell,
    Messages: faEnvelope,
    Communities: faUsers,
    Verified: faCheckCircle,
    Profile: faUser,
    More: faEllipsisH,
  };
  const [isPostPopupOpen, setIsPostPopupOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false); 

  const [chotaPidda, setChotapidda] = useState([
    {
      name: "Home",
      image: home,
      active: "none",
    },
    {
      name: "Explore",
      image: "",
      active: "none",
    },
    {
      name: "Notification",
      image: "",
      active: "none",
    },
    {
      name: "Messages",
      image: "",
      active: "none",
    },
    {
      name: "Communities",
      image: "",
      active: "none",
    },
    {
      name: "Verified",
      image: "",
      active: "none",
    },
    {
      name: "Profile",
      image: "",
      active: "none",
    },
    {
      name: "More",
      image: "",
      active: "none",
    },
  ]);
  const togglePostPopup = () => {
    setIsPostPopupOpen(!isPostPopupOpen);
  };
const userout=()=>{
  dispatch(logoutuser())
  navigate("/")
}
const toggleLogout = () => {
  setIsLogoutOpen(!isLogoutOpen); 
};

const toggleCardVisibility = () => {
  console.log("first")
  setIsCardVisible(true); // Toggle the state to show/hide the card
};

const closesidebar = (event) => {
  event.stopPropagation();
  if(isCardVisible){

    setIsCardVisible(false); // Close the card when clicking outside
  }
};  


  return (
    <div id="sidebar"   className={`sidebar ${isCardVisible ? "card-absolute" : ""}`}>
      <div className="card card-mob">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        {chotaPidda.map((item, index) => (
          <div
            onClick={() => {
              setCurrentindex(index);
            }}
            className="iconic"
          >
            {iconMapping[item.name] ? (
              <FontAwesomeIcon icon={iconMapping[item.name]} />
            ) : (
              <img src={item.image} alt="" />
            )}
            <span>{item.name}</span>
          </div>
        ))}
        <div className="post">
          <button onClick={togglePostPopup}>Post</button>
        </div>
        <div className="user">
          <div className="user-img logo">
            <img   src={`https://twitter-clone-8kdy.onrender.com/avatars/${loggedInUser.avatar}`} alt="" />
          </div>
          <div className="user-data">
          <h4 className="l-name">  {loggedInUser.name}</h4>
           <p className="l-username"> {loggedInUser.username}</p>
          </div>
          <div className="user-activity">
            <FontAwesomeIcon  onClick={toggleLogout} className="openlogout" icon={faEllipsisH} />
            {isLogoutOpen && (
              <div className="logout">
                <strong onClick={userout}>Logout</strong>
              </div>
            )}
          </div>
        </div>
      </div>
      <div onClick={closesidebar} className="main-contain">
        {currentindex == 0 ? (
            <Homepage toggleCardPosition={toggleCardVisibility} />
        ) : currentindex == 1 ? (
          <div>
            <h1>Explore</h1>
          </div>
        ) : currentindex == 2 ? (
          <div>
            <h1>Notification</h1>
          </div>
        ) : currentindex == 3 ? (
          <div>
            <h1>Messages</h1>
          </div>
        ) : currentindex == 4 ? (
          <div>
            <h1>Communities</h1>
          </div>
        ) : currentindex == 5 ? (
          <div>
            <h1>Verified</h1>
          </div>
        ) : currentindex == 6 ? (
          <div>
            <Profile/>
          </div>
        ) : (
          <div>
            <h1>More</h1>
          </div>
        )}
      </div>

      {isPostPopupOpen && (
        <div className="post-popup">
          <PostCard onClose={togglePostPopup} />
        </div>
      )}
    </div>
  );
}

export default Sidebar;

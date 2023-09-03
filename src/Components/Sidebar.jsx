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
  faList,
  faBookmark,
  faMoneyBill,
  faUsers as faCommunities,
  faCogs,
  faQuestionCircle,
  faSlidersH,
  faDesktop,
  faKeyboard,
  faSignOutAlt,
  faChartBar,
  faAd,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../Style/Sidebar.scss";
import Home from "../Pages/Home";
import Homepage from "../Pages/Homepage";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";
import { logoutuser } from "../Redux/AuthRedux/action";
import { useNavigate } from "react-router-dom";
import Bookmarks from "./Bookmarks";
import Messages from "../Pages/Messages";
import Communities from "../Pages/Communities";
import Verified from "../Pages/Verified";
import Explore from "../Pages/Explore";
import Notification from "../Pages/Notification";
import More from "../Pages/More";
import List from "../Pages/List";

function Sidebar() {
  const [currentindex, setCurrentindex] = useState(0);
  const [currentindex2, setCurrentindex2] = useState(0);
  const [currentindex3, setCurrentindex3] = useState(0);
  const loggedInUser = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    List: faList,
    Bookmarks: faBookmark,
    Monetization: faMoneyBill,
    "Setting and privacy": faCogs,
    "Help Center": faQuestionCircle,
    "Data Saver": faSlidersH,
    Display: faDesktop,
    "Keyboard shortcuts": faKeyboard,
    Logout: faSignOutAlt,
    Analytics: faChartBar,
    Ads: faAd,
    Search: faSearch,
  };
  const [isPostPopupOpen, setIsPostPopupOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);

  const [chotaPidda, setChotaPidda] = useState([
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
  const [chotaPidda2, setChotaPidda2] = useState([
    {
      name: "Profile",
      image: "",
      active: "none",
    },
    {
      name: "Verified",
      image: "",
      active: "none",
    },
    {
      name: "List",
      image: "",
      active: "none",
    },
    {
      name: "Bookmarks",
      image: "",
      active: "none",
    },
    {
      name: "Communities",
      image: "",
      active: "none",
    },
    {
      name: "Monetization",
      image: "",
      active: "none",
    },
  ]);
  const [chotaPidda3, setChotaPidda3] = useState([
    {
      name: "Home",
      image: "",
      active: "none",
    },
    {
      name: "Search",
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
      name: "List",
      image: "",
      active: "none",
    },
    {
      name: "Bookmarks",
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
  const [itemsToRender, setItemsToRender] = useState(() => {
    if (window.innerWidth <= 480) {
      return chotaPidda2;
    } else if (window.innerWidth <= 901) {
      return chotaPidda3;
    } else {
      return chotaPidda;
    }
  });
  const [category, setCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const obj = {
    Creater_Studio: {
      title: "Creater Studio",
      category: ["Analytics"],
    },
    Professional_Tools: {
      title: "Professional Tools",
      category: ["Ads"],
    },
    Settings_and_Support: {
      title: "Settings and Support",
      category: [
        "Setting and privacy",
        "Help Center",
        "Data Saver",
        "Display",
        "Keyboard shortcuts",
        "Logout",
      ],
    },
  };

  const arr = ["Creater_Studio", "Professional_Tools", "Settings_and_Support"];
  const toggleDropdown = (item) => {
    if (selectedCategory === item) {
      setSelectedCategory(null);
      setIsOpen(false);
    } else {
      setSelectedCategory(item);
      setCategory(obj[item].category);
      setIsOpen(true);
    }
  };

  const togglePostPopup = () => {
    setIsPostPopupOpen(!isPostPopupOpen);
  };
  const userout = () => {
    dispatch(logoutuser());
    navigate("/");
  };
  const toggleLogout = () => {
    setIsLogoutOpen(!isLogoutOpen);
  };

  const toggleCardVisibility = () => {
    setIsCardVisible(true);
  };

  const closesidebar = (event) => {
    event.stopPropagation();
    if (isCardVisible) {
      setIsCardVisible(false);
    }
  };
  const handleItemClick = (index) => {
    setCurrentindex(index);
  };

  const handleItemClick2 = (index) => {
    setCurrentindex2(index);
  };

  const handleItemClick3 = (index) => {
    setCurrentindex3(index);
  };

  const screenWidth = window.innerWidth;

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      if (newScreenWidth <= 480) {
        setCurrentindex2((currentindex) =>
          Math.min(currentindex, chotaPidda2.length - 1)
        );
      } else if (newScreenWidth > 480 && newScreenWidth <= 901) {
        setCurrentindex3((currentindex) =>
          Math.min(currentindex, chotaPidda3.length - 1)
        );
      } else {
        setCurrentindex((currentindex) =>
          Math.min(currentindex, chotaPidda.length - 1)
        );
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [chotaPidda, chotaPidda2, chotaPidda3]);

  return (
    <div
      id="sidebar"
      className={`sidebar ${isCardVisible ? "card-absolute" : ""}`}
    >
      <div className="card card-mob">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="absolute"></div>
        {itemsToRender.map((item, index) => (
          <div
            onClick={() => {
              if (screenWidth <= 480) {
                handleItemClick2(index);
              } else if (screenWidth <= 901) {
                handleItemClick3(index);
              } else {
                handleItemClick(index);
              }
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
          <div className="left">
            <div className="user-img logo2">
              <img
                src={`https://twitter-clone-8kdy.onrender.com/avatars/${loggedInUser.avatar}`}
                alt=""
              />
            </div>
            <div className="user-data">
              <div className="user-data-a">
                <h4 className="l-name"> {loggedInUser.name}</h4>
                <p className="l-username"> {loggedInUser.username}</p>
              </div>
              <div className="user-data-b">
                <span>
                  {" "}
                  <strong>{user.followers.length}</strong> Following
                </span>
                <span>
                  {" "}
                  <strong>{user.followers.length}</strong> Followers
                </span>
              </div>
            </div>
          </div>
          <div className="user-activity">
            <FontAwesomeIcon
              onClick={toggleLogout}
              className="openlogout"
              icon={faEllipsisH}
            />
            {isLogoutOpen && (
              <div className="logout">
                <strong onClick={userout}>Logout</strong>
              </div>
            )}
          </div>
        </div>
        <div className="profile-bottom">
          <div className="category">
            {arr.map((item) => (
              <div className="category-main" key={item}>
                <div
                  className="category-main-child"
                  onClick={() => toggleDropdown(item)}
                >
                  <span>{obj[item].title}</span> <span>^</span>
                </div>
                {isOpen && selectedCategory === item && (
                  <div className="category-output">
                    {category.map((subcategory) => (
                      <div className="subcategory" key={subcategory}>
                        {iconMapping[subcategory] ? (
                          <FontAwesomeIcon icon={iconMapping[subcategory]} />
                        ) : (
                          <img src={subcategory.image} alt="" />
                        )}
                        <p>{subcategory}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div onClick={closesidebar} className="main-contain">
        {screenWidth <= 480 ? (
          // For small screens
          currentindex2 == 0 ? (
            <Profile
              toggleCardPosition={toggleCardVisibility}
              setCurrentindex2={setCurrentindex2}
              setCurrentindex={setCurrentindex}
            />
          ) : currentindex2 == 1 ? (
            <Verified
              setCurrentindex2={setCurrentindex2}
              setCurrentindex={setCurrentindex}
              setCurrentindex3={setCurrentindex3}
            />
          ) : currentindex2 == 2 ? (
            <List setCurrentindex2={setCurrentindex2} />
          ) : currentindex2 == 3 ? (
            <Bookmarks
              toggleCardPosition={toggleCardVisibility}
              setCurrentindex2={setCurrentindex2}
            />
          ) : currentindex2 == 4 ? (
            <Communities
              setCurrentindex2={setCurrentindex2}
              setCurrentindex={setCurrentindex}
            />
          ) : (
            <div>
              <Homepage toggleCardPosition={toggleCardVisibility} />
            </div>
          )
        ) : screenWidth <= 901 ? (
          // For medium screens
          currentindex3 == 0 ? (
            <Homepage toggleCardPosition={toggleCardVisibility} />
          ) : currentindex3 == 1 ? (
            <h1>Search</h1>
          ) : currentindex3 == 2 ? (
            <Notification setCurrentindex={setCurrentindex} />
          ) : currentindex3 == 3 ? (
            <Messages setCurrentindex={setCurrentindex} />
          ) : currentindex3 == 4 ? (
            <List
              setCurrentindex={setCurrentindex}
              setCurrentindex2={setCurrentindex2}
            />
          ) : currentindex3 == 5 ? (
            <Bookmarks
              setCurrentindex2={setCurrentindex2}
              setCurrentindex={setCurrentindex}
            />
          ) : currentindex3 == 6 ? (
            <div>
              <Communities
                toggleCardPosition={toggleCardVisibility}
                setCurrentindex={setCurrentindex}
                setCurrentindex2={setCurrentindex2}
              />
            </div>
          ) : currentindex3 == 7 ? (
            <div>
              <Verified
                toggleCardPosition={toggleCardVisibility}
                setCurrentindex={setCurrentindex}
                setCurrentindex2={setCurrentindex2}
                setCurrentindex3={setCurrentindex3}
              />
            </div>
          ) : currentindex3 == 8 ? (
            <div>
              <Profile
                toggleCardPosition={toggleCardVisibility}
                setCurrentindex={setCurrentindex}
                setCurrentindex2={setCurrentindex2}
              />
            </div>
          ) : (
            <More setCurrentindex={setCurrentindex} />
          )
        ) : // For large screens
        currentindex == 0 ? (
          <Homepage toggleCardPosition={toggleCardVisibility} />
        ) : currentindex == 1 ? (
          <Explore setCurrentindex={setCurrentindex} />
        ) : currentindex == 2 ? (
          <Notification setCurrentindex={setCurrentindex} />
        ) : currentindex == 3 ? (
          <Messages setCurrentindex={setCurrentindex} />
        ) : currentindex == 4 ? (
          <Communities
            setCurrentindex={setCurrentindex}
            setCurrentindex2={setCurrentindex2}
          />
        ) : currentindex == 5 ? (
          <Verified
            setCurrentindex2={setCurrentindex2}
            setCurrentindex3={setCurrentindex3}
            setCurrentindex={setCurrentindex}
          />
        ) : currentindex == 6 ? (
          <div>
            <Profile
              toggleCardPosition={toggleCardVisibility}
              setCurrentindex={setCurrentindex}
              setCurrentindex2={setCurrentindex2}
              setCurrentindex3={setCurrentindex3}
            />
          </div>
        ) : (
          <More setCurrentindex={setCurrentindex} />
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

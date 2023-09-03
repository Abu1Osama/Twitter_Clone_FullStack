import React from "react";
import "../Style/Verified.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

function Verified({setCurrentindex,setCurrentindex3,setCurrentindex2}) {

  
  const closef=()=>{
    setCurrentindex(0)
    setCurrentindex2(6)
    setCurrentindex3(0)
  }
  return (
    <div className="Verified" id="Verified">
      <div className="verified-main">
        <div className="top">
          <p onClick={closef}>❌</p>
        </div>
        <div className="select-verified">
          <div className="heading">
            <h1>Who are you?</h1>
            <h4>Choose the right subscription for you:</h4>
          </div>
          <div className="center">
            <div className="center-left">
              <h4>Premium</h4>
              <h3>I am an individual</h3>
              <p>For individuals and creators</p>
            </div>
            <div className="center-right">
              <h4>Verified Organization</h4>
              <h3>I am an Organization</h3>
              <p>For Businessess, government agencies and non-profit</p>
            </div>
          </div>
          <div className="subscribe">
            <button>Subscribe</button>
          </div>
          <div className="policy">
            Learn more about <span>Premium </span>and{" "}
            <span>Verified Organizations</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verified;

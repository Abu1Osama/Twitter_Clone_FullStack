import React from "react";
import "../Style/Bookmarks.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


function Explore({setCurrentindex}) {
    const goBack = () => {
      setCurrentindex(0)// Go back to the previous page in the browser's history
      };
  return (
    <div className="page" id="page">
      <div className="top">
        <div > <FontAwesomeIcon onClick={goBack} icon={faArrowLeft} /></div>
        <div>
          <h4>Explore  </h4>
          <p> Post</p>
        </div>
      </div>
      <div className="data" style={{height:"300px" ,textAlign:"center",padding:"20px"}}>
        <h3>Work in Progress...</h3>
        <h3>Please wait...</h3>
      </div>
    </div>
  );
}






export default Explore
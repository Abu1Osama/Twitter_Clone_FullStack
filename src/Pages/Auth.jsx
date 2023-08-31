import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Style/Auth.scss";
import logo from "../assets/logo_t.png";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Auth() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);

  const openSignupModal = () => {
    setShowSignupModal(true);
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
  };

  const openSigninModal = () => {
    setShowSigninModal(true);
  };

  const closeSigninModal = () => {
    setShowSigninModal(false);
  };

  return (
    <div className="mainpage" id="mainpage">
      <div className="auth" id="auth">
        <div className="logo-box">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="content">
          <h1>Happening now</h1>
          <br />
          <br />
          <div className="action-auth">
            <h2>Join today.</h2>
            <br />
            <button className="action-button">
              <h2>
                {" "}
                <FontAwesomeIcon
                  icon={faApple}
                  className="apple-icon"
                  style={{ marginRight: "5px" }}
                />
                Sign up with Apple
              </h2>
            </button>
            <div className="or-container">
              <div className="or">or</div>
            </div>
            <button onClick={openSignupModal} className="action-button create">
              <h2>Create Account</h2>
            </button>
            <p className="policy">
              By signing up, you agree to the <span>Terms of Service</span> and{" "}
              <span>Privacy Policy</span>, including <span>Cookie Use</span>.
            </p>
            <br />
            <br />
            <h2 className="label">Already have an account?</h2>
            <button className="action-button login" onClick={openSigninModal}>
              <h2>Sign In</h2>
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        <span>About</span>
        <span>Help Center</span>
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>Cookie Policy</span>
        <span>Accessibility</span>
        <span>Ads info</span>
        <span>Blog</span>
        <span>Status</span>
        <span>Careers</span>
        <span>Brand Resources</span>
        <span>Advertising</span>
        <span>Marketing</span>
        <span>X for Business</span>
        <span>Developers</span>
        <span>Directory</span>
        <span>Settings</span>
        <span>@2023 X Crop</span>
     
      </div>
      {showSignupModal && <Signup onClose={closeSignupModal} />}
      {showSigninModal && <Login onClose={closeSigninModal} />}
    </div>
  );
}

export default Auth;

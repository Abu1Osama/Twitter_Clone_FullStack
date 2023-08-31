import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Login.scss";
import logo from "../assets/logo_t.png";
import Signup from "./Signup";
import { loginUser } from "../Redux/AuthRedux/action";
import { toast } from "react-hot-toast";
import { faApple } from "@fortawesome/free-brands-svg-icons"; // Import the Apple icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [step, setStep] = useState(1);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [usernameEditable, setUsernameEditable] = useState(true);
  const loggedInUserauth = useSelector((store) => store.auth.isAuth);
  const loggedInUser = useSelector((store) => store.auth.token);
  console.log(loggedInUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const moveToStep2 = () => {
    setStep(2);
  };
  const openSignupModal = () => {
    setShowSignupModal(true);
  };
  const closeSignupModal = () => {
    setShowSignupModal(false);
  };
  const handleSignIn = () => {
    try {
      dispatch(loginUser(email, password)); 
      localStorage.setItem("token", loggedInUser);
      if (loggedInUserauth==true&&loggedInUser && !isRedirecting) {
        setIsRedirecting(true);
setTimeout(() => {
  toast.success("user Loged in pleased wait.....")
  navigate("/tweet");
}, 3000);
       


      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    // Reset isRedirecting when component unmounts or when relevant state changes
    return () => {
      setIsRedirecting(false);
    };
  }, [loggedInUserauth, loggedInUser]);

  return (
    <div id="login" className="login">
      <div className="form">
        <div className="top">
          <p onClick={onClose}>❌</p>
          <img src={logo} alt="" />
        </div>
        <form action="">
          {step === 1 ? <h1>Sign in to X</h1> : <h1>Fill in your password</h1>}
          <div className="action">
            <div className="action-child">
              {step === 1 && (
                <>
                  <button className="action-button">
                    <h2>   <FontAwesomeIcon icon={faApple} className="apple-icon" style={{marginRight:"5px"}} />Sign In with Apple</h2>
                  </button>
                  <div className="or-container">
                    <div className="or">or</div>
                  </div>
                  <input
                    className="create"
                    type="text"
                    placeholder="Phone, Email, or Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </>
              )}
              {step === 2 && (
                <>
                  <input
                    className="create"
                    type="text"
                    placeholder="Phone, Email, or Username"
                    value={email}
                    readOnly={!usernameEditable} // Set readOnly based on usernameEditable
                  />
                  <input
                    className="create"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              )}
            </div>
            <div className="action-child">
              {step === 1 && (
                <button
                  className="action-button signin"
                  type="button"
                  onClick={moveToStep2}
                >
                  <h2>Next</h2>
                </button>
              )}
              {step === 2 && (
                <button
                  className="action-button signin"
                  type="button"
                  onClick={handleSignIn}
                >
                  <h2>Sign In</h2>
                </button>
              )}
            </div>
            <div className="action-child">
              <button className="action-button">
                <h2>Forgot Password?</h2>
              </button>
            </div>
            <br />
            <div className="already">
              <p>
                Don't have an account?
                <span onClick={openSignupModal}>Signup</span>
              </p>
            </div>
          </div>
        </form>
      </div>
      {showSignupModal && <Signup onClose={closeSignupModal} />}
    </div>
  );
}

export default Login;

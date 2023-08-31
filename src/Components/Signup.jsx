import React, { useState } from "react";
import "../Style/Signup.scss";
import { useDispatch } from "react-redux";
import { signupUser } from "../Redux/AuthRedux/action";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Signup({ onClose }) {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    month: "",
    day: "",
    year: "",
    dateOfBirth: "",
    avatar: null,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const dispatch = useDispatch();


  const handleNextClick = () => {
    if (currentStep === 1) {
      if (!formData.day || !formData.month || !formData.year)  {
        toast.error("Please fill in all required fields.");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!isFormValid()) {
        toast.error("Please fill in all required fields.");
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!formData.day || !formData.month || !formData.year) {
        toast.error("Please select a valid date of birth.");
        return;
      }
      if (!confirmed) {
        toast.error("Please confirm your details.");
        return;
      }
      handleSignup();
      toast.success("User created successfully");
      navigate("/login");
    }
  
  };
  

  const handleCheckboxChange = (event) => {
    setConfirmed(event.target.checked);
  };

 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "day" || name === "month" || name === "year") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        dateOfBirth: `${prevData.year}-${prevData.month.padStart(2, "0")}-${prevData.day.padStart(2, "0")}`,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  
  
  
  
  
  

  const isFormValid = () => {
    if (currentStep === 2) {
      return formData.username.trim() !== "";
    }
    return formData.name.trim() !== "" && formData.username.trim() !== "";
    // Add more validation conditions as needed
  };

  const handleConfirmClick = () => {
    console.log("Confirm button clicked");
    console.log(formData); // Log the form data when the Confirm button is clicked
  };

  const handleImageInputChange = (event) => {
    const selectedAvatar = event.target.files[0]; // Get the selected file
    setFormData((prevData) => ({
      ...prevData,
      avatar: selectedAvatar, // Update the avatar field with the selected file
    }));
  };
  const handleSignup = () => {
    const { username, password, name, avatar } = formData;
    // const dateOfBirth = `${formData.year}-${formData.month}-${formData.day}`;
    // console.log(dateOfBirth)

    const userData = new FormData(); // Create a FormData object
    userData.append("username", username);
    userData.append("password", password);
    userData.append("dateOfBirth", `${formData.year}-${formData.month}-${formData.day}`);
    userData.append("name", name);
      userData.append("avatar", avatar); // Append the avatar file to FormData
      // const userData={
      //   username:formData.username,
      //   password:formData.password,
      //   dateOfBirth: `${formData.year}-${formData.month}-${formData.day}`,
      //   name:formData.name,
      //   avatar,
      // }
    dispatch(signupUser(userData)); // Pass FormData to signupUser action
    console.log(userData)
  };
  return (
    <div className="signup" id="signup">
      <div className="form">
        <div className="top">
          <p onClick={onClose}>❌</p>
          <h2>Step {currentStep} of 3</h2>
        </div>

        {currentStep === 2 ? (
          <div className="confi">
            <h2>Confirm Your Details</h2>
            <p>Please confirm your information:</p>
            <div className="form-child">
           <span>Name: </span>  
           <p>{formData.name}</p>
            </div>
            <div className="form-child">
              <span>username: </span>
              <p> {formData.username}</p>
            </div>

            <div className="form-child">
              <span> Date of birth: </span>
              <p>
                {formData.month}/{formData.day}/{formData.year}
              </p>
              
            </div>
            <label>
              <input
                type="checkbox"
                checked={confirmed}
                onChange={handleCheckboxChange}
              />
              I confirm that the above information is correct.
            </label>
          </div>
        ) : currentStep === 3 ? (
          <div className="form">
            <h2 className="edit-heading">Edit Your Details</h2>
            <form action="">
              <div className="form-child">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={true}
                />
              </div>
              <div className="form-child">
                <label htmlFor="username">username:</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-child">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-child">

                <input type="file" accept="image/*" onChange={handleImageInputChange} />
              </div>
              <div className="form-child">
                <label>Date of birth:</label>
                <div className="date">
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                >
                  <option value="">Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleInputChange}
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, index) => index + 1).map(
                    (day) => (
                      <option key={day} value={day.toString().padStart(2, "0")}>
                        {day}
                      </option>
                    )
                  )}
                </select>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                >
                  <option value="">Year</option>
                  {Array.from({ length: 50 }, (_, index) => 2003 - index).map(
                    (year) => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    )
                  )}
                </select>
              </div>
              </div>
            </form>
          </div>
        ) : (
          <form action="">
            <h1>Create your account</h1>
            <div className="form-child">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-child">
              <input
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-child">
              <span>Date of birth</span>
              <p>
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </p>
              <div className="date">
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                >
                  <option value="">Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleInputChange}
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, index) => index + 1).map(
                    (day) => (
                      <option key={day} value={day.toString().padStart(2, "0")}>
                        {day}
                      </option>
                    )
                  )}
                </select>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                >
                  <option value="">Year</option>
                  {Array.from({ length: 50 }, (_, index) => 2003 - index).map(
                    (year) => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </form>
        )}
        <div className="next">
          <button onClick={handleNextClick} >
            {currentStep === 1
              ? "Next"
              : currentStep === 2
              ? "Next"
              : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;

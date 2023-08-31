import React, { useEffect, useRef, useState } from "react";
import "../Style/Editprofile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCamera } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../Redux/UserRedux/action";

function Editprofile({ onClose, userId }) {
  const dispatch = useDispatch();

  // const userToEdit = useSelector((state) => state.auth.userslogedin);
  const userToEdit = useSelector((state) => state.auth.userslogedin);
  console.log(userToEdit.avatar);
  const UserIds = userToEdit.userId;
  const initialFormData = {
    name: "",
    month: "",
    day: "",
    year: "",
    avatar: null,
  };
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(initialFormData);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const dateParts = userToEdit.dateOfBirth.split("-");
    if (userToEdit) {
      setFormData({
        name: userToEdit.name,
        month: dateParts[1],
        day: dateParts[2],
        year: dateParts[0],
        avatar: userToEdit.avatar,
      });
    }
  }, [userToEdit]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      avatar: file,
    }));
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      const profileData = {
        name: formData.name,
        dateOfBirth: `${formData.year}-${formData.month}-${formData.day}`,
      };

      if (userToEdit) {
        dispatch(editProfile(UserIds, profileData));
        console.log(profileData);
        console.log("Profile update dispatched successfully");
      } else {
        console.error("User not found for editing");
      }
    } catch (error) {
      console.error("Profile update dispatch failed", error);
    }
  };

  return (
    <div className="edit" id="edit">
      <div className="edit-main">
        <div className="edit-top">
          <div className="back">
            <p onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </p>
            <h3>Edit Profile</h3>
          </div>
          <div className="save-btn">
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
        <div className="edit-bottom">
          <form action="" encType="multipart/form-data">
            <div className="data-edit">
              <div className="hero">
                <img src="https://img.freepik.com/free-photo/beautiful-view-greenery-bridge-forest-perfect-background_181624-17827.jpg?w=2000" alt="" />
              </div>
              <div className="avatar">
                  <FontAwesomeIcon className="camera" icon={faCamera} onClick={() => fileInputRef.current.click()}/>{" "}
                  {/* Use your desired Font Awesome camera icon */}
                <input
                type="file"
                accept="image/*"
                name="avatar"
                onChange={handleFileChange}
                ref={fileInputRef} // Attach the ref here
                style={{ display: "none" }} 
                />
         
              <div className="img">
                {selectedImage ? (
                  <img src={selectedImage} alt="Selected Avatar" />
                ) : (
                  <img
                    src={`https://twitter-clone-8kdy.onrender.com/avatars/${formData.avatar}`}
                    alt="Current Avatar"
                  />
                )}
              </div>
              </div>
              {/* <img className="heroimage" src={"https://img.freepik.com/free-photo/beautiful-view-greenery-bridge-forest-perfect-background_181624-17827.jpg?w=2000"} alt="" /> */}
            </div>

            <input
              type="text"
              placeholder="username"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />

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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editprofile;

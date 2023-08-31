// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import "../Style/Postcard.scss";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes, faImages } from "@fortawesome/free-solid-svg-icons";
// import { toast } from "react-hot-toast";
// import { createTweet, createTweetFailure } from "../Redux/TweetRedux.js/action";

// function PostCard({ onClose }) {
//   const dispatch = useDispatch();
//   const [content, setContent] = useState("");
//   const [showImageInput, setShowImageInput] = useState(false);
//   const loggedInUser = useSelector((state) => state.auth);
 
//   console.log(loggedInUser)
//   const [image, setImage] = useState( null);
//   console.log("Image state before form submission:", image);


//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
    
//     const formData = new FormData();
//     formData.append("content", content);
     
//     if(image){
//       formData.append("image", image); 
//     }
  
//     try {
//       // Assuming createTweet action returns the newly created tweet
//       const newTweet = await dispatch(createTweet(content, formData));
  
//       // Update Redux state with the new tweet
//       dispatch(createTweet(newTweet)); // Replace with appropriate action
  
//       onClose();
//       toast.success("Post created");
//     } catch (error) {
//       console.error("Tweet creation failed:", error);
//       dispatch(createTweetFailure(error.response?.data?.error || "Unknown error"));
//     }
//   };
  
  

//   const handleImageInputChange = (e) => {
//     const selectedImage = e.target.files[0];
//     console.log("Selected image:", selectedImage);
//     setImage(selectedImage);
//   };
//   return (
//     <div className="postcard" id="postcard">
//       <div className="form">
//         <div className="top">
//           <p onClick={onClose}>
//             <FontAwesomeIcon icon={faTimes} />
//           </p>
//         </div>
//         <div className="mid">
//           <div className="img">
//             <img
//                 src={`https://twitter-clone-8kdy.onrender.com/avatars/${loggedInUser.avatar}`}
//               alt="ava"
//             />
//           </div>

//           <form >
//             <div>
//               <select name="" id="">
//                 <option value="">Everyone</option>
//                 <option value="">Public</option>
//                 <option value="">Only me</option>
//               </select>
//             </div>
//             <textarea
//               placeholder="What is happening?!"
//               name="content"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               cols="30"
//               rows="10"
//             ></textarea>
//           </form>
//         </div>
//         <div className="reply">
//           <span>Everyone can reply</span>
//         </div>
//         <div className="bottom">
//         <div className="bottom-img" onClick={() => setShowImageInput(!showImageInput)}>
//           <FontAwesomeIcon icon={faImages} />
//         </div>
//         <div>
//           <button onClick={handleFormSubmit} type="submit">Post</button>
//         </div>
//         {showImageInput && (
//         <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageInputChange}
//       />
//         )}
//       </div>
//     </div>
//     </div>
//   );
// }

// export default PostCard;


import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../Style/Postcard.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faImages } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { createTweet, createTweetFailure } from "../Redux/TweetRedux.js/action";

function PostCard({ onClose }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(""); 
  const loggedInUser = useSelector((state) => state.auth);

  console.log(loggedInUser);
  const [image, setImage] = useState(null);
  console.log("Image state before form submission:", image);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    try {
      // Assuming createTweet action returns the newly created tweet
      const newTweet = await dispatch(createTweet(content, formData));

      // Update Redux state with the new tweet
      dispatch(createTweet(newTweet)); // Replace with appropriate action

      onClose();
      toast.success("Post created");
    } catch (error) {
      console.error("Tweet creation failed:", error);
      dispatch(
        createTweetFailure(error.response?.data?.error || "Unknown error")
      );
    }
  };

  const fileInputRef = useRef(null);

  const handleImageIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleImageInputChange = (e) => {
    const selectedImage = e.target.files[0];
    console.log("Selected image:", selectedImage);
    setImage(selectedImage);
    setSelectedFileName(selectedImage.name);
  };
  return (
    <div className="postcard" id="postcard">
      <div className="form">
        <div className="top">
          <p onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </p>
        </div>
        <div className="mid">
          <div className="img">
            <img
              src={`https://twitter-clone-8kdy.onrender.com/avatars/${loggedInUser.avatar}`}
              alt="ava"
            />
          </div>

          <form>
            <div>
              <select name="" id="">
                <option value="">Everyone</option>
                <option value="">Public</option>
                <option value="">Only me</option>
              </select>
            </div>
            <textarea
              placeholder="What is happening?!"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
          </form>
        </div>
        <div className="reply">
          <span>Everyone can reply</span>
        </div>
        <div className="bottom">
          <div className="bottom-img" onClick={handleImageIconClick}>
            <FontAwesomeIcon icon={faImages} />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageInputChange}
            style={{ display: "none" }} // Hide the file input
          />
           {selectedFileName && (
          <div className="selected-file-name">{selectedFileName}</div>
        )}
          <div>
            <button onClick={handleFormSubmit} type="submit">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;


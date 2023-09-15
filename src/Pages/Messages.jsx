import React, { useEffect, useState } from "react";
import "../Style/Message.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";

function Messages({ setCurrentindex }) {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const goBack = () => {
    setCurrentindex(0);
  };
  const selectedUser = useSelector((state) => {
    // Replace 'yourUserReducer' with the actual name of your user reducer
    return state.user.users.find((user) => user._id === selectedUserId);
  });
  const [message, setMessage] = useState("");
  const loggedInUserId = useSelector((state)=>state.auth.userId); // Replace with your actual user ID
  const users = useSelector((state) => state.user.users); // Retrieve users from Redux
  const [filteredMessages, setFilteredMessages] = useState([]);
  // const ws = new WebSocket("ws://localhost:3000");
  const io=require("socket.io-client")
  
  const socket = io("https://twitter-clone-8kdy.onrender.com"); // Replace with your server URL
  useEffect(() => {
    console.log("Attempting to connect to WebSocket...");
    
    
    socket.on("connect", () => {
      console.log("Connected to WebSocket.");
    });
  
    socket.on("chatMessage", (message) => {
      console.log("Received message:", message);
      handleReceivedMessage(message);
    });
  
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket.");
    });
  
    return () => {
      // Clean up WebSocket connection when the component unmounts
      socket.disconnect();
      console.log("WebSocket disconnected.");
    };
  }, []);
  
  

  const handleReceivedMessage = (message) => {
    // Update the selectedUserMessages state with the received message
    setFilteredMessages((prevMessages) => [...prevMessages, message]);
  };
 // Function to format a timestamp to a readable date and time
const formatTimestamp = (timestamp) => {
  const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };
  return new Date(timestamp).toLocaleDateString(undefined, options);
};


  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const messageData = {
        sender: loggedInUserId,
        recipient: selectedUserId,
        content: message,
      };

      // Emit the message to the server via WebSocket
      socket.emit("chatMessage", messageData);

      // Update the selectedUserMessages state with the sent message
      handleReceivedMessage(messageData);

      setMessage("");
    }
  };

  const handleUserSelection = (userId) => {
    setSelectedUserId(userId);
    // Clear the selectedUserMessages state when a new user is selected
    setFilteredMessages([]);
  };

  return (
    <div className="Message" id="Message">
      <div className="top">
        <div>
          <FontAwesomeIcon onClick={goBack} icon={faArrowLeft} />
        </div>
        <div>
          <h4>Messages</h4>
          <p> Post</p>
        </div>
      </div>
      <div className="data">
        <h3>User List</h3>
        {users
          .filter((user) => user._id !== loggedInUserId)
          .map((user) => (
            <li key={user._id} onClick={() => handleUserSelection(user._id)}>
              {user.name}
            </li>
          ))}
      </div>
      {selectedUserId &&   (
        <div className="chat-section">
          <div className="chat-header">
            <div className="chatter-avatar">
           
              <img
                src={`https://twitter-clone-8kdy.onrender.com/avatars/${selectedUser.avatar}`}
                alt="sam"
              />
            </div>
            <div className="chater-data">
              <h3> {selectedUser.name}</h3>
              <p>{selectedUser.username}</p>
            </div>
          </div>
          <div className="chat-display">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.sender === loggedInUserId ? "sent" : "received"
                  }`}
                >
                  <p>{msg.content}</p>
                  {msg.timestamp ? formatTimestamp(msg.timestamp) : "Timestamp not available"}
                </div>
              ))
            ) : (
              <p>No messages available.</p>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;

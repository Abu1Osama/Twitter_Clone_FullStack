import React, { useEffect, useState } from "react";
import "../Style/Message.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  receiveChatMessages,
  sendChatMessage,
} from "../Redux/MessageRedux/action";
import socketIOClient from "socket.io-client";

function Messages({ setCurrentindex }) {
  const goBack = () => {
    setCurrentindex(0);
  };

  const [message, setMessage] = useState("");
  const loggedInUserId = useSelector((state) => state.auth.userId);
  const users = useSelector((state) => state.user.users);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [filteredMessages, setFilteredMessages] = useState([]);

  const selectedUserMessages = useSelector(
    (state) => state.messages.messages
  );

  const selectedUser = useSelector((state) =>
    state.user.users.find((user) => user._id === selectedUserId)
  );

  const dispatch = useDispatch();

  const socket = socketIOClient("https://twitterclone-abu1osama.vercel.app");

  useEffect(() => {
    socket.on("chatMessage", (message) => {
      console.log("Received message:", message);
      dispatch(receiveChatMessages(message));
    });

    if (selectedUserId) {
      dispatch(receiveChatMessages(selectedUserId));
    }

    return () => {
      socket.disconnect();
    };
  }, [dispatch, selectedUserId]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const messageData = {
        sender: loggedInUserId,
        recipient: selectedUserId,
        content: message,
      };

      socket.emit("chatMessage", messageData);
      dispatch(sendChatMessage(messageData));

      setMessage("");
    }
  };

  const handleUserSelection = (userId) => {
    setSelectedUserId(userId);
    dispatch(receiveChatMessages(userId));
  };

  // Filter messages based on sender and recipient
  useEffect(() => {
    const filtered = selectedUserMessages.filter(
      (msg) =>
        (msg.sender === loggedInUserId && msg.recipient === selectedUserId) ||
        (msg.sender === selectedUserId && msg.recipient === loggedInUserId)
    );
    setFilteredMessages(filtered);
  }, [selectedUserMessages, loggedInUserId, selectedUserId]);

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
      {selectedUserId && (
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
              filteredMessages.map((msg) => (
                <div
                  key={msg._id}
                  className={`message ${
                    msg.sender === loggedInUserId ? "sent" : "received"
                  }`}
                >
                  <p>{msg.content}</p>
                  <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
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

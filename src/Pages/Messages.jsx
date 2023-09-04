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

function Messages({ setCurrentindex }) {
  const goBack = () => {
    setCurrentindex(0);
  };

  const [message, setMessage] = useState("");
  const loggedInUserId = useSelector((state) => state.auth.userId);
  const users = useSelector((state) => state.user.users);
  console.log(users);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserMessages, setSelectedUserMessages] = useState([]);
  console.log(loggedInUserId);
  const chat = useSelector((state) => state.messages);
  console.log(chat);
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const messageData = {
        sender: loggedInUserId,
        recipient: selectedUserId,
        content: message,
      };
      console.log(messageData);
      dispatch(sendChatMessage(messageData));
      setMessage("");
    }
  };

  const handleUserSelection = (userId) => {
    setSelectedUserId(userId);

    const selectedUser = users.find((user) => user._id === userId);
    setSelectedUser(selectedUser);
    console.log(selectedUser);

    if (userId) {
      dispatch(receiveChatMessages(userId));
    }
  };
  // useEffect(() => {
  //   const messagesForSelectedUser = chat.messages.filter(
  //     (msg) => msg.sender === selectedUserId || msg.recipient === selectedUserId
  //   );

  //   messagesForSelectedUser.sort(
  //     (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  //   );

  //   setSelectedUserMessages(messagesForSelectedUser);
  // }, [chat, selectedUserId]);

  useEffect(() => {
    // Filter chat messages for the selected user and logged-in user
    const messagesForSelectedUser = chat.messages.filter(
      (msg) =>
        (msg.sender === loggedInUserId && msg.recipient === selectedUserId) ||
        (msg.sender === selectedUserId && msg.recipient === loggedInUserId)
    );
  
    // Sort the messages by timestamp (you can customize the sorting logic)
    messagesForSelectedUser.sort((a, b) =>
      new Date(a.timestamp) - new Date(b.timestamp)
    );
  
    setSelectedUserMessages(messagesForSelectedUser);
  }, [chat, selectedUserId, loggedInUserId]);
  
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
      {selectedUser && (
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
            {selectedUserMessages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === loggedInUserId ? "sent" : "received"
                }`}
              >
                <p>{msg.content}</p>
                <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
              </div>
            ))}
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

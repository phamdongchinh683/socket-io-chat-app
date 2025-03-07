import { default as PropTypes } from 'prop-types';
import React from "react";
import '../../../Chat/index.css';

const BoxChat = ({ historyMessages, newMessages, userSend }) => {
 return (
  <div className="chat-messages">
   {historyMessages.length > 0 || newMessages.length > 0 ? (
    <>
     {[...historyMessages, ...newMessages].map((msg, index) => (
      <div key={index} className={`message ${msg.userEmail === userSend ? "user" : "other"}`}>
       <strong>{msg.userEmail}:</strong> {msg.messageText}
      </div>
     ))}
    </>
   ) : (
    <p>No history message.</p>
   )}
  </div>
 )
}

BoxChat.propTypes = {
 historyMessages: PropTypes.array,
 newMessages: PropTypes.array,
 userSend: PropTypes.string
};
export default BoxChat;
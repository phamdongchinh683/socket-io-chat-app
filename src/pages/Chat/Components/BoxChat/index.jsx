import { default as PropTypes } from 'prop-types';
import React from "react";
import '../../../Chat/index.css';

const BoxChat = ({ historyMessages, newMessages, userSend }) => {
 if (historyMessages.length > 0 || newMessages.length > 0) {
  return (
   <div className='chat-messages'>
    {[...historyMessages, ...newMessages].map((msg, index) => (
     <div key={index} className={`message ${msg.userEmail === userSend ? "user" : "other"}`}>
      <strong>{msg.userEmail.split('@')[0]}:</strong> {msg.messageText}
     </div>
    ))}
   </div>
  )
 } else {
  return (<></>)
 }
}

BoxChat.propTypes = {
 historyMessages: PropTypes.array,
 newMessages: PropTypes.array,
 userSend: PropTypes.string
};
export default BoxChat;
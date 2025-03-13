import { default as PropTypes } from 'prop-types';
import React, { useEffect, useRef } from "react";
import '../../../Chat/index.css';

const BoxChat = ({ historyMessages, newMessages, userSend }) => {

 const chatRef = useRef(null);

 useEffect(() => {
  if (chatRef.current) {
   chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }
 }, [historyMessages, newMessages]);

 if (historyMessages.length === 0 && newMessages.length === 0) {
  return <span>Currently no messages in this chat</span>;
 }
 return (
  <div className='chat-messages' >
   {[...historyMessages, ...newMessages].map((msg, index, array) => (
    <div key={index} className={`message ${msg.userEmail === userSend ? "user" : "other"}`}
     ref={index === array.length - 1 ? chatRef : null}     >
     <strong>{msg.userEmail.split('@')[0]}:</strong> {msg.messageText}
    </div>
   ))}
  </div>
 )
}

BoxChat.propTypes = {
 historyMessages: PropTypes.array,
 newMessages: PropTypes.array,
 userSend: PropTypes.string
};

export default BoxChat;
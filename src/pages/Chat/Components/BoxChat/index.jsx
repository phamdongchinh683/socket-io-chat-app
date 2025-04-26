import { default as PropTypes } from 'prop-types';
import React, { useRef } from "react";
import '../../../Chat/index.css';
import MessageMenu from '../MessageMenu';

const BoxChat = ({ historyMessages, newMessages, updateMessage, removeMessage, userSend }) => {
   const chatRef = useRef(null);
   const messages = [...historyMessages, ...newMessages];

   return (
      <div className='chat-messages'>
         {messages.length === 0 ? null : messages.map((msg, index) => {
            let props = {
               ref: index === messages.length - 1 ? chatRef : null,
               message: msg,
               isOwn: msg.userEmail === userSend,
               onEdit: (newText) => updateMessage(msg.id, newText),
               onRemove: () => removeMessage(msg.id)
            }
            return (
               <MessageMenu
                  key={index}
                  {...props} />
            )
         })}
      </div>
   );
};

BoxChat.propTypes = {
   historyMessages: PropTypes.array.isRequired,
   newMessages: PropTypes.array.isRequired,
   userSend: PropTypes.string.isRequired,
   updateMessage: PropTypes.func,
   removeMessage: PropTypes.func,
};

export default BoxChat;

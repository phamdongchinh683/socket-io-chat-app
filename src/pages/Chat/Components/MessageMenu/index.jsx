import PropTypes from "prop-types";
import React, { forwardRef, useState } from "react";
import '../../index.css';

const MessageMenu = forwardRef(({ message, isOwn, onEdit, onRemove }, ref) => {
 const [showOptions, setShowOptions] = useState(false);
 const [isEditing, setIsEditing] = useState(false);
 const [editText, setEditText] = useState(message.messageText);

 const handleClick = () => {
  if (!isEditing) {
   setShowOptions((prev) => !prev);
  }
 };

 const handleKeyDown = (e) => {
  if (e.key === "Enter") {
   onEdit(editText);
   setIsEditing(false);
  } else if (e.key === "Escape") {
   setEditText(message.messageText);
   setIsEditing(false);
  }
 };

 return (
  <div
   className={`message ${isOwn ? "user" : "other"}`}
   ref={ref}
   onClick={handleClick}
  >
   <strong>{message.userEmail?.split?.('@')[0] || 'undefined'}: </strong>
   {isEditing ? (
    <input
     type="text"
     value={editText}
     onChange={(e) => setEditText(e.target.value)}
     onKeyDown={handleKeyDown}
     autoFocus
     onClick={(e) => e.stopPropagation()}
    />
   ) : (
    <span style={{ cursor: "pointer" }}>{message.messageText}</span>
   )}

   {showOptions && isOwn && !isEditing && (
    <div className="options-menu">
     <button
      onClick={(e) => {
       e.stopPropagation();
       setIsEditing(true);
       setShowOptions(false);
      }}
     >
      Edit
     </button>
     <button
      onClick={(e) => {
       e.stopPropagation();
       onRemove();
      }}
     >
      Remove
     </button>
    </div>
   )}
  </div>
 );
});

MessageMenu.propTypes = {
 message: PropTypes.object.isRequired,
 isOwn: PropTypes.bool.isRequired,
 onEdit: PropTypes.func.isRequired,
 onRemove: PropTypes.func.isRequired,
};

export default MessageMenu;

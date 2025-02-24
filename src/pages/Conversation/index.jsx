import { useEffect, useState } from "react";
import { AuthService } from "../../services";

const Conversation = () => {
 const [conversations, setConversations] = useState([]);
 const { conversationList } = AuthService();


 useEffect(() => {
  const getConversations = async () => {
   try {
    const response = await conversationList();
    if (response.status === 200) {
     setConversations(response.data.data);
    }
   } catch (error) {
    console.error(error);
   }
  }
  getConversations();
 }, [])

 return (
  <div className="chat-container">
   <h2 className="chat-title">Your Conversations</h2>
   {conversations.length === 0 ? (
    <p className="empty-message">You currently have no conversations.</p>
   ) : (
    <ul className="chat-list">
     {conversations.map((conversation) => (
      <li key={conversation.conversationId} className="chat-item">
       <span>{conversation.conversationName}</span>
      </li>
     ))}
    </ul>
   )}
  </div>
 );
};

export default Conversation;

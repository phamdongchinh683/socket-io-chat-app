import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services";

const Conversation = () => {
 const navigate = useNavigate();
 const { conversationList } = AuthService();
 const [conversations, setConversations] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const getConversations = async () => {
   try {
    setLoading(true);
    const response = await conversationList();
    if (response.data.statusCode === 200) {
     setConversations(response.data.data);
     setLoading(false);
    }
   } catch (error) {
    console.error(error);
   }
  };
  getConversations();
 }, []);

 const joinConversation = (conversationId) => {
  navigate(`/chat/${conversationId}`)
 };


 return (
  <div className="chat-container">
   <h2 className="chat-title">Your Conversations</h2>
   {loading ? (
    <Box sx={{ width: '100%' }}>
     <LinearProgress />
    </Box>
   ) : conversations.length === 0 ? (
    <p className="empty-message">You currently have no conversations.</p>
   ) : (
    <ul className="chat-list">
     {conversations.map((conversation) => (
      <li
       key={conversation.conversationId}
       onClick={() => joinConversation(conversation.conversationId)}
      >
       <span>{conversation.conversationName}</span>
      </li>
     ))}
    </ul>
   )}
  </div>
 );
};

export default Conversation;

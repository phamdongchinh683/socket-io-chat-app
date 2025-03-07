import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout";
import { AuthService } from "../../services";

const Conversation = () => {
 const navigate = useNavigate();
 const [conversations, setConversations] = useState([]);
 const [loading, setLoading] = useState(true);
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
   } finally {
    setLoading(false);
   }
  };
  const timeoutId = setTimeout(() => {
   getConversations();
  }, 1000);
  return () => clearTimeout(timeoutId);
 }, []);


 const joinConversation = (conversationId) => {
  navigate(`/chat/${conversationId}`)
 };


 return (
  <Layout>
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
  </Layout>
 );
};

export default Conversation;

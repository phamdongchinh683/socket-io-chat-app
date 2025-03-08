import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";
import { AuthService } from "../../services";
import ConversationList from './Components/ConverstationList';

const Conversation = () => {
 const { conversationList } = AuthService();
 const [conversations, setConversations] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const getConversations = async () => {
   try {
    const response = await conversationList();
    if (response.data.statusCode === 200) {
     setConversations(response.data.data);
     setLoading(false)
    }
   } catch (error) {
    setLoading(true)
    console.error(error);
   }
  };
  getConversations();
 }, []);


 return (
  <>
   <h2 className="chat-title">Your Conversations</h2>
   {
    loading ? (
     <Box sx={{ width: '100%' }}>
      <LinearProgress />
     </Box>
    ) : conversations.length === 0 ? (
     <p className="empty-message">You currently have no conversations.</p>
    ) : (
     <ConversationList conversations={conversations} />
    )
   }
  </>
 );
};

export default Conversation;

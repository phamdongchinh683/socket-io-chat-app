import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import { getSocket } from '../../commons/configSocket';
import useToken from '../../jwt';
import ConversationList from './Components/ConverstationList';

const Conversation = () => {
 const socket = getSocket();
 const [conversations, setConversations] = useState([]);
 const { getToken } = useToken();
 const user = jwtDecode(getToken);

 useEffect(() => {
  socket.emit('myChats', { userId: user.sub });
  socket.on('onChats', (data) => {
   if (data.status === 'success') {
    setConversations(data.data);
   }
  })
 }, [socket]);

 return (
  <>
   <h2 className="chat-title">Your Conversations</h2>
   <ConversationList conversations={conversations} />
  </>
 );
};

export default Conversation;

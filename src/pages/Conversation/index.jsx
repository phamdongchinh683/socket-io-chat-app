import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import { getSocket } from '../../commons/configSocket';
import AuthInput from '../../components/AuthInput';
import useToken from '../../jwt';
import ConversationList from './Components/ConversationList';

const Conversation = () => {
 const socket = getSocket();
 const [conversations, setConversations] = useState([]);
 const [search, setSearch] = useState('');
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

 const filterConversations = conversations.filter((param) =>
  param.conversationName.toLowerCase().includes(search.toLowerCase())
 );

 const handleSearchChange = (event) => {
  setSearch(event.target.value);
 };


 return (
  <>
   <h2 className="chat-title">Your Conversations</h2>
   <AuthInput type={'search'} field={'Search for conversation'} hint={'Enter here'} onChange={handleSearchChange} />
   <ConversationList conversations={filterConversations} />
  </>
 );
};

export default Conversation;

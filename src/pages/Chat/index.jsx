import Stack from '@mui/material/Stack';
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getSocket } from "../../commons/configSocket";
import MessageInput from "../../components/MessageInput";
import SendButton from "../../components/SendButton";
import useToken from "../../jwt";
import { Message } from '../../models/Message';
import BoxChat from "./Components/BoxChat";
import './index.css';

const Chat = () => {
  const { id } = useParams();
  const socket = getSocket();

  const { getToken } = useToken();
  const [historyMessages, setHistoryMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const decoded = jwtDecode(getToken);
  const run = useRef(false);

  useEffect(() => {
    if (!run.current) {
      socket.emit('joinConversation', { conversationId: id })
      socket.on('historyMessage', (data) => {
        setHistoryMessages(data.result.length > 0 ? data.result : []);
      })
      run.current = true;
    }
  }, [id]);

  useEffect(() => {
    socket.on('onMessage', (data) => {
      if (data.status === "success") {
        setMessages((prev) => [
          ...prev,
          {
            id: data.data.id,
            userEmail: data.data.userEmail,
            messageText: data.data.messageText,
          },
        ]);
      } else {
        console.error(data.message);
      }
    })
    return () => {
      socket.off("onMessage");
    };
  }, [])


  const sendMessage = () => {
    if (socket && newMessage && id) {
      socket.emit("newMessage",
        new Message(decoded.email, id, newMessage)
      );
      setNewMessage('')
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
      setNewMessage('')
    }
  };

  let props = {
    label: 'Aa',
    value: newMessage,
    onChange: (e) => setNewMessage(e.target.value),
    handleKeyDown: handleKeyDown
  }

  let boxChatProps = {
    historyMessages: historyMessages,
    newMessages: messages,
    userSend: decoded.email
  }

  return (
    <div className="chat-container">
      <h3>Messages</h3>
      <BoxChat {...boxChatProps} />
      <Stack direction="row" spacing={0} sx={{
        justifyContent: "center",
        alignItems: "center",
      }}>
        <MessageInput {...props} />
        <SendButton func={sendMessage} />
      </Stack>
    </div>

  );
};

export default Chat;





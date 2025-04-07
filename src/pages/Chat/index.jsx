import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSocket } from "../../commons/configSocket";
import { ConversationEvent, MessageEvent } from '../../commons/socketEvents';
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
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const decoded = jwtDecode(getToken);
  const run = useRef(false);

  useEffect(() => {
    if (!run.current) {
      socket.emit(ConversationEvent.JOIN_CONVERSATION, { conversationId: id })
      socket.on(ConversationEvent.STATUS_JOIN, (data) => {
        if (data.status === 'failed') {
          setHistoryMessages(data.message);
          setLoading(true)
        }
      })
      socket.on(MessageEvent.MESSAGE_HISTORY, (data) => {
        setHistoryMessages(data.data.length > 0 ? data.data : []);
      })
      run.current = true;
    }
    return () => {
      socket.off(MessageEvent.MESSAGE);
      socket.off(ConversationEvent.STATUS_JOIN);
    };
  }, [id]);

  useEffect(() => {
    socket.on(MessageEvent.MESSAGE, (data) => {
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
      socket.off(MessageEvent.MESSAGE);
    };
  }, [])


  const updateMessage = (id, message) => {
    socket.emit('joinConversation', { conversationId: id })
  }

  const deleteMessage = (id) => {

  }

  const sendMessage = () => {

    if (newMessage === '') {
      toast.warn('Please not empty message')
      return;
    }
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
    label: 'Input message here',
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
    <div>
      <h1>My Chat</h1>
      <BoxChat {...boxChatProps} />
      <Stack direction="row" spacing={3} padding={1} sx={{
        justifyContent: "center",
        alignItems: "center",
      }}>{loading ? (
        <Typography variant="h3" component="h2" sx={{ textAlign: 'center', padding: 2 }}>
        </Typography>
      ) : (
        <>
          <MessageInput {...props} />
          <SendButton func={sendMessage} />
        </>
      )}
      </Stack>
    </div>
  );
};

export default Chat;





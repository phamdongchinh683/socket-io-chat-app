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
import useToken from "../../jwt/useToken";
import { Message } from '../../models/Message';
import BoxChat from "./Components/BoxChat";
import SearchMessage from './Components/SearchMessage';
import './index.css';

const Chat = () => {
  const { id } = useParams();
  const socket = getSocket();
  const [search, setSearch] = useState('');
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
        let result = data.data;
        const keyCount = Object.keys(result).length;
        if (keyCount > 2) {
          setMessages((prev) => [
            ...prev,
            {
              id: result.id,
              userEmail: result.userEmail,
              messageText: result.messageText,
            },
          ]);
        } else if (keyCount === 2) {
          toast.success('This message updated')
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === result.id
                ? { ...msg, messageText: result.messageText }
                : msg
            )
          );
          setHistoryMessages((prev) =>
            prev.map((msg) =>
              msg.id === result.id
                ? { ...msg, messageText: result.messageText }
                : msg
            )
          );
        } else if (keyCount === 1) {
          toast.success('This message deleted')
          setMessages((prev) =>
            prev.filter((msg) => msg.id !== result.id)
          );
          setHistoryMessages((prev) =>
            prev.filter((msg) => msg.id !== result.id)
          );
        }
      }
    })

    return () => {
      socket.off(MessageEvent.MESSAGE);
    };
  }, [socket]);


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

  const editMessage = (messageId, newMessage) => {
    socket.emit(MessageEvent.UPDATE_MESSAGE, {
      id: messageId,
      user_id: decoded.sub,
      conversation_id: id,
      message_text: newMessage,
    })
  }

  const removeMessage = (messageId) => {
    socket.emit(MessageEvent.DELETE_MESSAGE, {
      id: messageId,
      conversationId: id,
    })
  }


  let props = {
    label: 'Input message here',
    value: newMessage,
    onChange: (e) => setNewMessage(e.target.value),
    handleKeyDown: handleKeyDown
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const messageFilter = historyMessages.filter((param) => param.messageText.toLowerCase().includes(search.toLowerCase()))

  let boxChatProps = {
    historyMessages: messageFilter,
    newMessages: messages,
    userSend: decoded?.email,
    updateMessage: editMessage,
    removeMessage: removeMessage,
  }

  let propsSearchMessage = {
    type: 'search',
    field: 'Search message',
    hint: 'Try it',
    handleSearchChange: handleSearchChange,
  }

  return (
    <div>
      <div>
        <h1>My Chat</h1>
        <SearchMessage  {...propsSearchMessage} />
      </div>
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





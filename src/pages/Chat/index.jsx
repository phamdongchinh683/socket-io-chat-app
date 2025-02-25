import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../commons/configSocket";
import AuthInput from "../../components/AuthInput";


const Chat = () => {
  const { id } = useParams();
  const [historyMessages, setHistoryMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const decoded = jwtDecode(localStorage.getItem('token'));

  // console.log(decoded)
  const getMessages = () => {
    socket.emit("joinConversation", { conversationId: id });
    socket.on("historyMessage", (data) => {
      setHistoryMessages(data.result.length > 0 ? data.result : []);
    });
  }

  getMessages()// call messages get history messages

  const sendMessage = () => {
    if (socket && newMessage && id) {
      socket.emit("newMessage", {
        userEmail: 'example',
        conversationId: id,
        messageText: newMessage,
      });
    }
  };
  useEffect(() => {
    socket.on("onMessage", (data) => {
      if (data.status === "success") {
        setMessages((prev) => [
          ...prev,
          {
            userEmail: data.data.userEmail,
            messageText: data.data.messageText,
            userId: data.data.userId,
          },
        ]);
        console.log(data);
      } else if (data.status === "error") {
        console.error("Error received:", data.message);
      }
    });

    return () => {
      socket.off('onMessage')
    };
  }, []);


  return (
    <div className="chat-messages">
      <h3>Messages</h3>
      {historyMessages.length > 0 ? (
        <ul>
          {historyMessages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.userEmail}</strong>: {msg.messageText}
            </li>
          ))}
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.userEmail}: {msg.messageText}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>No history message.</p>
      )}

      <AuthInput type={'text'} hint={'Send message here'} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={sendMessage}
        onKeyDown={e => e.key === 'Enter' ? sendMessage : ''}>Send</button>
    </div >
  );
};

export default Chat;

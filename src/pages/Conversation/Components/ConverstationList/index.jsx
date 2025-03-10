import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { jwtDecode } from 'jwt-decode';
import { default as PropTypes } from 'prop-types';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { getSocket } from '../../../../commons/configSocket';
import useToken from '../../../../jwt';
import { Conversation } from '../../../../models/Conversation';
import { AuthService } from '../../../../services';
import SelectUserChat from '../SelectUserChat';

const ConversationList = ({ conversations }) => {
  const { getUsers } = AuthService();
  const { getToken } = useToken()
  const socket = getSocket();
  const [showInit, setShowInit] = React.useState(false);
  const [userIds, setUserIds] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate();
  const userCurrent = jwtDecode(getToken);
  React.useEffect(() => {
    const getUserLocal = localStorage.getItem("users");

    if (getUserLocal) {
      setUsers(JSON.parse(getUserLocal));
    } else {
      fetchUsers();
    }

    async function fetchUsers() {
      try {
        const response = await getUsers();
        if (response.data.statusCode === 200) {
          setUsers(response.data.data);
          localStorage.setItem("users", JSON.stringify(response.data.data));
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

  }, [])

  React.useEffect(() => {
    socket.on('onMessage', (data) => {
      console.log(data);
      if (data.status === 'success') {
        navigate(`/chat/${data.result}`);
      }
    });
    return () => socket.off('onMessage');
  }, [socket, navigate]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserIds(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  let joinConversation = (conversationId) => {
    navigate(`/chat/${conversationId}`)
  };

  const showInitConversation = (param) => {
    setShowInit(param);
  }

  let selectUserChatProps = {
    users: users,
    email: userIds,
    handleChange: handleChange,
    value: userIds
  }

  let initChat = () => {
    let userStart = [userCurrent.sub, ...userIds]; // add userCurrent index 0 it will create conversation 
    let userEmail = new Set(userStart); // set new because i don't duplicate
    let userInChat = users
      .filter(({ id }) => userEmail.has(id))
      .map(({ email }) => email)
      .join(", "); // convert ->> phamdchinh@gmail.com, dsadsdsa@gmail.com - name conversation

    console.log(userStart)
    console.log(userEmail)
    console.log(userInChat);
    const newChat = userEmail.size > 2
      ? new Conversation(userStart.toString(), userInChat, "I started conversation", true)
      : new Conversation(userStart.toString(), userInChat, "I started conversation", false);

    socket.emit('newChat', newChat);
  }

  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {conversations.map((value) => (
          <ListItem
            key={value.conversationId}
            disableGutters
            secondaryAction={
              <IconButton aria-label="comment"
                onClick={() => joinConversation(value.conversationId)}>
                <ChatIcon />
              </IconButton>
            }
          >
            <ListItemText primary={`${value.conversationName}`} />
          </ListItem>
        ))}
      </List>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={() => showInitConversation(true)}
      />
      {showInit && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          alignItems: 'flex-end'
        }}>
          <Fab color='error' aria-label="close"
            onClick={() => showInitConversation(false)}>
            <CloseIcon fontSize='medium' />
          </Fab>
          <SelectUserChat {...selectUserChatProps} />
          <Button variant="contained" color="primary" onClick={initChat}>
            Create
          </Button>
        </div>
      )}
    </>
  );
}

ConversationList.propTypes = {
  conversations: PropTypes.array,
};

export default ConversationList
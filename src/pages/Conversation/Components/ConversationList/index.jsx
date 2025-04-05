import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import { Button } from '@mui/material';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Typography from '@mui/material/Typography';
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
      if (data.status === 'success') {
        navigate(`/chat/${data.data}`);
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

  let deleteStringUsers = () => {
    setUserIds([])
  }

  let selectUserChatProps = {
    users: users,
    email: userIds,
    handleChange: handleChange,
    value: userIds
  }

  let initChat = () => {
    let userStart = [userCurrent.sub, ...userIds]; // add user current index 0 it will create conversation 
    let userEmail = new Set(userStart); // set new because i don't duplicate
    let userInChat = users
      .filter(({ id }) => userEmail.has(id))
      .map(({ email }) => email)
      .join(", "); // convert ->> phamdchinh@gmail.com, dsadsdsa@gmail.com - name conversation
    const newChat = userEmail.size > 2
      ? new Conversation(userStart.toString(), 'Group Chat', `Created this conversation`, true)
      : new Conversation(userStart.toString(), userInChat, `Created this conversation`, false);
    socket.emit('newChat', newChat);
  }

  return (
    <>
      {conversations.length > 0 ? (
        <List sx={{ width: '100%', maxWidth: 360, padding: 0 }}>
          {conversations.map((value) => (
            <ListItem
              key={value.conversationId}
              disableGutters
              secondaryAction={
                <IconButton aria-label="comment" onClick={() => joinConversation(value.conversationId)}>
                  <ChatIcon />
                </IconButton>
              }
            >
              <ListItemText primary={value.conversationName} />
            </ListItem>
          ))}
        </List>
      ) : (
        <>
          <Typography variant="h3" component="h2" sx={{ textAlign: 'center', padding: 2 }}>Not found chats</Typography>
          <SouthEastIcon fontSize='large' />
        </>
      )}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          '& .MuiFab-primary': {
            bgcolor: 'black',
            color: 'white',
            '&:hover': {
              bgcolor: 'black'
            }
          }
        }}
        icon={<SpeedDialIcon sx={{ background: 'black' }} />}
        onClick={() => showInitConversation(true)}
      />
      {showInit && (
        <div style={{
          position: 'absolute',
          background: 'black',
          top: '50%',
          color: 'white',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          borderRadius: '15pt',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 20
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }} >
            <strong>Create chat with user</strong>
            <Fab aria-label="close"
              onClick={() => showInitConversation(false)}>
              <CloseIcon fontSize='medium' />
            </Fab>
          </div>
          <SelectUserChat {...selectUserChatProps} />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: "100%"
          }}>
            <IconButton aria-label="delete" size="large" sx={{ color: 'white' }} onClick={deleteStringUsers}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
            <Button sx={{
              background: 'white',
              color: 'black',
              borderRadius: 2
            }} onClick={initChat}>
              Create
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

ConversationList.propTypes = {
  conversations: PropTypes.array,
};

export default ConversationList
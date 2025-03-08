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
import { default as PropTypes } from 'prop-types';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../../../services';
import SelectUserChat from '../InitChat/Components/SelectUserChat';

const ConversationList = ({ conversations }) => {
 const { getUsers } = AuthService();
 const [showInit, setShowInit] = React.useState(false);
 const [users, setUsers] = React.useState([]);
 const navigate = useNavigate();

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

 const joinConversation = (conversationId) => {
  navigate(`/chat/${conversationId}`)
 };


 const showInitConversation = (param) => {
  setShowInit(param);
 }

 return (
  <>
   <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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
     <Fab color='error' aria-label="close" onClick={() => showInitConversation(false)}>
      <CloseIcon fontSize='medium' />
     </Fab>
     <SelectUserChat users={users} />
     <Button variant="contained" color="primary">
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
import { Menu } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const MenuNotificationRender = ({ openNotificationMenu, handleNotificationMenuClose, localNotifications }) => {

 const navigate = useNavigate();
 const joinConversation = (conversationId) => {
  navigate(`/chat/${conversationId}`)
 }
 return (
  <Menu
   anchorEl={openNotificationMenu}
   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
   open={Boolean(openNotificationMenu)}
   onClose={handleNotificationMenuClose}
  >
   {localNotifications.length > 0 ? (
    localNotifications.map((notification, index) => {
     let notificationSplit = notification.split('conversation:');
     return (
      <MenuItem key={index}
       onClick={
        notificationSplit.length > 1 ? () => joinConversation(notificationSplit[1])
         : undefined
       }>
       {notificationSplit[0]}
      </MenuItem>
     );
    })
   ) : (
    <MenuItem>No new notifications</MenuItem>
   )}
  </Menu >
 );
}

MenuNotificationRender.propTypes = {
 openNotificationMenu: PropTypes.object,
 handleNotificationMenuClose: PropTypes.func.isRequired,
 localNotifications: PropTypes.array.isRequired,
};

export default MenuNotificationRender;

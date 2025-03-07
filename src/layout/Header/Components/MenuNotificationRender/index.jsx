import { Menu } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';

const MenuNotificationRender = ({ openNotificationMenu, handleNotificationMenuClose, localNotifications }) => {
 return (
  <Menu
   anchorEl={openNotificationMenu}
   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
   open={Boolean(openNotificationMenu)}
   onClose={handleNotificationMenuClose}
  >
   {localNotifications.length > 0 ? (
    localNotifications.map((notification, index) => (
     <MenuItem key={index}>{notification}</MenuItem>
    ))
   ) : (
    <MenuItem>No new notifications</MenuItem>
   )}
  </Menu>
 );
}

MenuNotificationRender.propTypes = {
 openNotificationMenu: PropTypes.object,
 handleNotificationMenuClose: PropTypes.func.isRequired,
 localNotifications: PropTypes.array.isRequired,
};

export default MenuNotificationRender;

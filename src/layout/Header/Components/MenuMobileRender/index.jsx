import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Menu } from "@mui/material";
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { default as PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const MenuMobileRender = ({
 mobileMoreAnchorEl,
 mobileMenuId,
 isMobileMenuOpen,
 handleMobileMenuClose,
 handleProfileMenuOpen,
 notifications }) => {
 return (
  <Menu
   anchorEl={mobileMoreAnchorEl}
   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
   id={mobileMenuId}
   keepMounted
   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
   open={isMobileMenuOpen}
   onClose={handleMobileMenuClose}
  >
   <MenuItem component={Link} to="/my-chats">
    <IconButton size="large" aria-label="show new mails" color="inherit">
     <Badge color="error">
      <ChatBubbleOutlineIcon />
     </Badge>
    </IconButton>
   </MenuItem>
   <MenuItem>
    <IconButton size="large" aria-label="show new notifications" color="inherit">
     <Badge badgeContent={notifications} color="error">
      <NotificationsIcon />
     </Badge>
    </IconButton>
   </MenuItem>
   <MenuItem onClick={handleProfileMenuOpen}>
    <IconButton size="large" aria-label="account of current user" color="inherit">
     <ArrowDropDownIcon />
    </IconButton>
   </MenuItem>
  </Menu>
 )
}

MenuMobileRender.propTypes = {
 mobileMoreAnchorEl: PropTypes.object,
 mobileMenuId: PropTypes.string.isRequired,
 isMobileMenuOpen: PropTypes.bool.isRequired,
 handleMobileMenuClose: PropTypes.func.isRequired,
 notifications: PropTypes.number.isRequired,
 handleProfileMenuOpen: PropTypes.func.isRequired,
};

export default MenuMobileRender;
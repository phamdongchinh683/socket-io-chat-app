import { Menu } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { default as PropTypes } from 'prop-types';
import { Handle } from "../../../../handle";

const MenuRender = ({ anchorEl, menuId, isMenuOpen, handleMenuClose }) => {
 const { handleLogOut } = Handle();
 return (
  <Menu
   anchorEl={anchorEl}
   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
   id={menuId}
   keepMounted
   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
   open={isMenuOpen}
   onClose={handleMenuClose}
  >
   <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
   <MenuItem onClick={handleLogOut}>Logout</MenuItem>
  </Menu>
 )
}

MenuRender.propTypes = {
 anchorEl: PropTypes.any,
 menuId: PropTypes.string.isRequired,
 isMenuOpen: PropTypes.bool.isRequired,
 handleMenuClose: PropTypes.func.isRequired,
};

export default MenuRender;
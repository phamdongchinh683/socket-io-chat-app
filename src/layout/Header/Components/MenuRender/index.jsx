import { Menu } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { default as PropTypes } from 'prop-types';
import { Link } from "react-router-dom";
import useToken from "../../../../jwt";

const MenuRender = ({ anchorEl, menuId, isMenuOpen, handleMenuClose }) => {

 const { handleLogOut } = useToken();

 return (
  <Menu
   anchorEl={anchorEl}
   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
   id={menuId}
   keepMounted
   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
   open={isMenuOpen}
  >
   <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
    Profile
   </MenuItem>
   <MenuItem component={Link} to="/update-password" onClick={handleMenuClose}>
    Update Password
   </MenuItem>
   <MenuItem onClick={handleLogOut}>Logout</MenuItem>
  </Menu>
 )
}

MenuRender.propTypes = {
 anchorEl: PropTypes.any,
 menuId: PropTypes.string.isRequired,
 isMenuOpen: PropTypes.bool.isRequired,
 handleMenuClose: PropTypes.func
};

export default MenuRender;
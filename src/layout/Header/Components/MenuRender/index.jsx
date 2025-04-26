import { Menu } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { default as PropTypes } from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import useToken from "../../../../jwt/useToken";
import { AuthService } from "../../../../services";

const MenuRender = ({ anchorEl, menuId, isMenuOpen, handleMenuClose }) => {
 const { logOutAccount } = AuthService();
 const { deleteToken } = useToken()
 const navigate = useNavigate();

 const handleLogOut = async () => {
  try {
   const result = await logOutAccount();
   if (result.data.data === "logged out") {
    deleteToken();
    navigate("/sign-in");
   }
  } catch (e) {
   const statusCode = e.response?.data?.statusCode;
   if (statusCode === 401) {
    deleteToken();
    navigate("/sign-in");
   }
  }
 };


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
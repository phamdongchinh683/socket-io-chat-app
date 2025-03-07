import AccountCircle from '@mui/icons-material/AccountCircle';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { socket } from "../../commons/configSocket";
import Notification from '../../components/Notification';
import useToken from '../../jwt';
import MenuMobileRender from './Components/MenuMobileRender';
import MenuNotificationRender from './Components/MenuNotificationRender';
import MenuRender from './Components/MenuRender';

export default function Header() {
  const { getToken } = useToken();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [openNotificationMenu, setOpenNotificationMenu] = useState(null);
  const [countNotifications, setCountNotifications] = useState(0);
  const [localNotifications, setLocalNotifications] = useState([]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const token = getToken;
  const decoded = token ? jwtDecode(token) : null;

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const handleNotificationMenuOpen = (event) => {
    setOpenNotificationMenu(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setOpenNotificationMenu(null);
  };

  useEffect(() => {
    if (token) {
      const localstorageNotification = JSON.parse(localStorage.getItem(decoded.email)) || '[]';
      setCountNotifications(localstorageNotification.length);
      setLocalNotifications(localstorageNotification);
    } else {
      setCountNotifications(0);
      setLocalNotifications([]);
    }
  }, []);

  useEffect(() => {
    if (token) {
      socket.emit("messageNotification");
    }

    socket.on("onNotification", (data) => {
      if (data.status === 'success') {
        toast.success(data.data);
        setLocalNotifications((prev) => {
          const updatedNotifications = [...prev, data.data];
          if (decoded?.email) {
            localStorage.setItem(decoded.email,
              JSON.stringify(updatedNotifications.filter((param) => param !== null)));
          }
          return updatedNotifications;
        });
        setCountNotifications((prev) => prev + 1);
      }
    });

    return () => {
      socket.off("onNotification");
    };
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography component={Link} to='/' variant="h6" sx={{ display: { xs: "none", sm: "block" }, textDecoration: "none", color: "inherit", cursor: "pointer" }}
          >
            Chat App
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton component={Link} to="/my-chats" size="large" color="inherit">
              <Badge color="error">
                <ChatBubbleOutlineIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit" onClick={handleNotificationMenuOpen}>
              <Badge badgeContent={countNotifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <MenuMobileRender
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        mobileMenuId={mobileMenuId}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        notifications={countNotifications}
        handleProfileMenuOpen={handleProfileMenuOpen}
      />
      <MenuRender
        anchorEl={anchorEl}
        menuId={menuId}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
      />
      <MenuNotificationRender
        openNotificationMenu={openNotificationMenu}
        handleNotificationMenuClose={handleNotificationMenuClose}
        localNotifications={localNotifications}
      />
      <Notification />
    </Box>
  );
}

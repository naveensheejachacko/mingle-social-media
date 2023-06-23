import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from "../../../Redux/userSlice";
import { useSelector } from "react-redux";

// import { resetPosts } from "../../../Redux/postSlice";
import Cookies from "js-cookie";
import Searches from '../Search/Searches';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));





function Navbar() {



  const userName = useSelector((state) => state.user?.user);
  const email = useSelector((state) => state.user?.email);
  const userId = useSelector((state) => state.user?.user_id);
  const profilePic = useSelector((state) => state.user?.profilePic);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogout = () => {
    Cookies.remove("jwt_user");
    Cookies.remove("role", "user");
    Cookies.remove("id");
    dispatch(logout());
    navigate("/");

    // clear posts
    // dispatch(resetPosts());
  };


  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);



  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuId2 = 'primary-search-account-menu';
  const renderOption = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId2}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate('/home')}>Home</MenuItem>
      <MenuItem onClick={() => navigate('/explore')}>Explore</MenuItem>
      <MenuItem onClick={() => navigate('/chat')}>Messages</MenuItem>
      <MenuItem onClick={() => navigate('/people')}>Connections</MenuItem>
      <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
      <MenuItem onClick={() => navigate(`/profile/${userId}`)}>Profile</MenuItem>
      <MenuItem  onClick={userLogout}>Logout</MenuItem>
    </Menu>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>navigate(`/profile/${userId}`)} sx={{cursor:"pointer"}}>Profile</MenuItem>
      <MenuItem  onClick={userLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show  new mails" color="inherit" onClick={()=>navigate('/chat')}>
          <Badge  color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show  new notifications"
          color="inherit"
        >
          <Badge badgeContent={notifications?.length} color="error">
            <NotificationsIcon onClick={()=>navigate('/notifications')} sx={{cursor:"pointer"}}/>
          </Badge>
        </IconButton>
        <p onClick={()=>navigate('/notifications')} sx={{cursor:"pointer"}}>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton >
        <p onClick={()=>navigate(`/profile/${userId}`)} sx={{cursor:"pointer"}} >Profile</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menuLogout"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton >
        <p onClick={userLogout}>Logout</p>
      </MenuItem>
    </Menu>
  );




  return (

    <div className="newNav" style={{position:"sticky",top:0,zIndex:100}}>

    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="sticky" style={{color:"white",backgroundColor:"#80b3ff",top: 0}}>
        <Toolbar>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>

        <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleMenuIconClick}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={()=>navigate('/home')} style={{cursor:"pointer"}} 
          >
                      <img
            style={{ width: "31px", height: "31px", marginLeft: "2rem" }}
            src="../../../Images/logo.jpg"
            alt=""
          />
          <span
            className="navbar-text"
            style={{
              fontFamily: "Iceberg",
              fontWeight: "bold",
              color: "black",
            }}
          >
            mingle
          </span>
          </Typography>
          <Search>
            <Searches/>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show  new mails" color="inherit" onClick={()=>navigate('/chat')}>
              <Badge  color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            {/* <IconButton
              size="large"
              aria-label="show  new notifications"
              color="inherit"
            >
              <Badge badgeContent={notifications?.length} color="error">
                <NotificationsIcon onClick={()=>navigate('/notifications')} sx={{cursor:"pointer"}}/>
              </Badge>
            </IconButton> */}
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
      {renderMobileMenu}
      {renderMenu}
      {renderOption}
    </Box>
    </div>
  );
}

export default Navbar;

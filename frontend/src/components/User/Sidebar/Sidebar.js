


import React from "react";
import { logout } from "../../../Redux/userSlice";
import { resetPosts } from "../../../Redux/postSlice";
import Cookies from "js-cookie";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiCommentDetail } from "react-icons/bi";
import "./Sidebar.scss";
import { useSelector } from "react-redux";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import {
  AccountBox,
  Home,
  Article,
  Person,
  Settings,
  Message,
  Logout,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { useState } from "react";

function Sidebar() {
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



  return (
    <div className="leftSideBar">
    <div className="sidebarContainer">
      <div className="menu">
        {/* <div className="user">
        
        <span>adharsh</span>
      </div> */}
        <div className="item">
          <List sx={{ width: '100%', maxWidth: 300, color: "black" }}>
            <ListItem >

              {/* <AddPostModal /> */}
            </ListItem>
            <ListItem >
              <ListItemButton component="a" onClick={() => navigate('/home')}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Homepage" />
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton component="a" onClick={() => navigate('/explore')}>
                <ListItemIcon>
                  <Article />
                </ListItemIcon>
                <ListItemText primary="Explore" />
              </ListItemButton>
            </ListItem>
            {/* <ListItem >
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Groups" />
          </ListItemButton>
        </ListItem> */}
            <ListItem >
              <ListItemButton component="a" onClick={()=> navigate("/chat")}>
                <ListItemIcon>
                  <Message />
                </ListItemIcon>
                <ListItemText primary="Messages" /> 
              </ListItemButton>
            </ListItem>

            <ListItem >
            <ListItemButton component="a" onClick={()=> navigate("/people")} >
              <ListItemIcon>
              <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="People" />
             
            </ListItemButton>
            </ListItem>




            <ListItem >
              <ListItemButton  onClick={()=>navigate('/settings')}>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
                    <ListItem className="user-profile" style={{display:'flex',alignItems: 'center'}} >
                 {/* <ListItemButton  component="a"> */}
                 <ListItemIcon>
                   <img       style={{
        height: '2.5em',
        width: '2.5em',
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: '1em'
      }} src={profilePic} alt="Profile Picture" />
                   <div
                     className="user-details"
                     style={{ cursor: "pointer" }}
                     onClick={() => navigate(`/userprofile/`)}
                   >
                     {" "}
                     <span className="user-name"    style={{ fontWeight: 'bold', marginBottom: '5px' }}>{
          userName &&
          userName.charAt(0).toUpperCase() + userName.slice(1)
        }</span>
                     <br />
                     <span className="user-email"  style={{ fontSize: '12px', marginBottom: '5px' }}>{email}</span>
                   </div>
                 </ListItemIcon>
                 {/* <ListItemText primary="Profile" /> */}
                {/* </ListItemButton> */}
            </ListItem>






            <ListItem  onClick={userLogout}>

              <ListItemButton component="a">
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>

            </ListItem>
            {/* <ListItem >
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <ModeNight />
                </ListItemIcon>
                <Switch />
              </ListItemButton>
            </ListItem> */}
            
          </List>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Sidebar;

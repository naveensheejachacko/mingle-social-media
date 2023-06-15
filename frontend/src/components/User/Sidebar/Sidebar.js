import React from "react";
import { logout } from "../../../Redux/userSlice";
import { resetPosts } from "../../../Redux/postSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { BiCommentDetail } from "react-icons/bi";
import "./Sidebar.scss";
import { useSelector } from "react-redux";


import {
  AccountBox,
  Home,
  Article,
  // ModeNight,
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
  // Switch,
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
    dispatch(resetPosts());
  };

  const [sidebarClosed, setSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setSidebarClosed(!sidebarClosed);
  };




  return (
    <div className={`leftBar ${sidebarClosed ? "sidebarClosed" : ""}`}>



    <div className="leftBar">
      <div
        className="container"
        style={{
          display: "flex",
          height: "100vh",
          overflow: "scroll initial",
          marginTop: "2rem",
        }}
      >
        <div className="menu">
          {/* <div className="user">
          
          <span>adharsh</span>
        </div> */}
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
          <div className="item">
            <List sx={{ width: "100%", maxWidth: 360, color: "black" }}>
              <ListItem></ListItem>
              <ListItem>
                <ListItemButton component="a" onClick={() => navigate("/home")}>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Homepage" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  component="a"
                  onClick={() => navigate("/explore")}
                >
                  <ListItemIcon>
                    <Article />
                  </ListItemIcon>
                  <ListItemText primary="Explore" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component="a">
                  <ListItemIcon>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="People"
                    onClick={() => navigate("/people")}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton component="a">
                  <ListItemIcon>
                    <Message />
                  </ListItemIcon>
                  <ListItemText primary="Messages"  onClick={()=> navigate("/chat")} />
                </ListItemButton>
              </ListItem>


              <ListItem>
                <ListItemButton component="a">
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText onClick={() => navigate("/settings")} primary="Settings" />
                </ListItemButton>
              </ListItem>


              <ListItem className="user-profile">
                {/* <ListItemButton  component="a"> */}
                <ListItemIcon>
                  <img src={profilePic} alt="Profile Picture" />
                  <div
                    className="user-details"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/profile/${userId}`)}
                  >
                    {" "}
                    <span className="user-name">{userName}</span>
                    <span className="user-email">{email}</span>
                  </div>
                </ListItemIcon>
                {/* <ListItemText primary="Profile" /> */}
                {/* </ListItemButton> */}
              </ListItem>
              <ListItem>
                <ListItemButton component="a" onClick={userLogout}>
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


    </div>
  );
}

export default Sidebar;

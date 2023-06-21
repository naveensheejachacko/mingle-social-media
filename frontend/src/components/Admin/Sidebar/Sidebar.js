import React from "react";
import { setAdminLogout } from "../../../Redux/adminSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

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
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminLogout = () => {
    Cookies.remove("jwt-admin");
    Cookies.remove("role", "admin");
    dispatch(setAdminLogout());
    navigate("/adminn");
  };

  return (
    <div className="leftBar1">
      <div className="container">
        <div className="menu">
          {/* <img
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
          </span> */}
          <div className="item">
            <List sx={{ width: '100%', maxWidth: 360, color: "black" }}>
              <ListItem>
              </ListItem>
              {/* <ListItem> */}
                {/* <ListItemButton component="a" onClick={() => navigate('/')}>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Homepage" />
                </ListItemButton> */}
              {/* </ListItem> */}
              <ListItem>
                <ListItemButton component="a" onClick={() => navigate('/adminn/users')}>
                  <ListItemIcon>
                  <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component="a" onClick={() => navigate('/adminn/reportPost')}>
                  <ListItemIcon>
                  <Article />
                  </ListItemIcon>
                  <ListItemText primary="Post Management" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={adminLogout}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

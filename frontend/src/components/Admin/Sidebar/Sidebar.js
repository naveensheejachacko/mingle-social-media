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
  // ModeNight,
  Person,
  Settings,
  Message,
  Logout
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  // Switch,
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

    <div className="leftBar">
      <div className="container" style={{
          display: "flex",
          height: "100vh",
          overflow: "scroll initial",
          marginTop: "2rem",
        }}>
        <div className="menu">
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
            <List sx={{ width: '100%', maxWidth: 360, color: "black" }}>
              <ListItem >
              </ListItem>
              <ListItem >
                <ListItemButton  component="a" >
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Homepage" />
                </ListItemButton>
              </ListItem>
              <ListItem >
                <ListItemButton component="a" onClick={() => navigate("/adminn/users")}>
                  <ListItemIcon>
                    <Article />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </ListItem>
              <ListItem >
                <ListItemButton component="a" >
                  <ListItemIcon>
                  <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Post Management" onClick={() => navigate("/adminn/reportPost")}  /> 
                </ListItemButton>
              </ListItem>
              <ListItem  >
                <ListItemButton component="a"  onClick={adminLogout}>
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

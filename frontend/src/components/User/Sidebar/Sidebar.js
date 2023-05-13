import React from "react";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBBtn
} from "cdbreact";

import { logout } from "../../../Redux/userSlice";
import { resetPosts } from "../../../Redux/postSlice";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { BiCommentDetail  } from 'react-icons/bi';

import "./Sidebar.scss";

import { useSelector } from 'react-redux';

function Sidebar() {

  const userName=useSelector((state)=>state.user?.user)
  const email=useSelector((state)=>state.user?.email)

const navigate=useNavigate();
const dispatch = useDispatch();
const userLogout = () => {
    Cookies.remove("jwt_user")
    Cookies.remove("role","user")
    Cookies.remove("id");
    dispatch(logout());
    navigate('/')

  // clear posts
  dispatch(resetPosts());



  }


  return (
    // <div className="adminSide">
    <div className="top"
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar
        style={{borderRight:'0.5px solid rgb(230, 227, 227)' }}
        textColor="#000"
        backgroundColor="#fff"
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <img
            style={{ width: "31px", height: "31px", marginRight: "10px" }}
            src="../../../Images/logo.jpg"
            alt=""
          />
          <a href="#">
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
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
          <div class="sidebar-menu">
    
    <NavLink  to="/home" activeClassName="activeClicked">
    <CDBSidebarMenuItem>Home</CDBSidebarMenuItem>
    </NavLink>

    <NavLink exact to="#" activeClassName="activeClicked">

    <CDBSidebarMenuItem> People</CDBSidebarMenuItem>
      </NavLink>
      <NavLink exact to="#" activeClassName="activeClicked">

      <CDBSidebarMenuItem> Messages</CDBSidebarMenuItem>
      </NavLink>
      <NavLink exact to="#" activeClassName="activeClicked">

      <CDBSidebarMenuItem> Notifications</CDBSidebarMenuItem>
      </NavLink>
      <NavLink exact to="#" activeClassName="activeClicked">

      <CDBSidebarMenuItem>Settings</CDBSidebarMenuItem>
      </NavLink>

      </div>
      <NavLink to="#" activeClassName="activeClicked">
            <CDBSidebarMenuItem>


  <div className="user-profile">
              <img src="assets/person/1.jpeg" alt="" />
              <div className="user-details">
            <NavLink to="/profile">  <span className="user-name">{userName}</span></NavLink>  
                <span className="user-email">{email}</span>
              </div>
            </div>
           

            </CDBSidebarMenuItem>
          </NavLink>
          <CDBSidebarMenuItem>
          <button class="button3" onClick={userLogout}>Logout</button>
          </CDBSidebarMenuItem>


    {/* <CDBBtn button class="button3" onClick={userLogout}>Logout</CDBBtn> */}

          </CDBSidebarMenu>
        </CDBSidebarContent>

      </CDBSidebar>
    </div>
    // </div>
  );
}

export default Sidebar;
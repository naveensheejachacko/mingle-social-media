import React from "react";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

import { logout } from "../../../Redux/userSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { BiCommentDetail  } from 'react-icons/bi';

import "./Sidebar.scss";

import { useSelector } from 'react-redux';

function Sidebar() {

  const userName=useSelector((state)=>state.user?.user?.user);


const navigate=useNavigate();
const dispatch = useDispatch();
const userLogout = () => {
    Cookies.remove("jwt_user")
    Cookies.remove("role","user")
    Cookies.remove("id");
    dispatch(logout());
    navigate('/')

  }


  return (
    <div className="adminSide">
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
            <NavLink exact to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
            </NavLink> */}
            <NavLink  to="#"  style={{ textDecoration: "none" }}  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">My Connections</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem >
              <BiCommentDetail size={25} />
                Messages
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem >
               Notifications
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem >
                Settings
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem>
                Profile
              </CDBSidebarMenuItem>
            </NavLink>


            <CDBSidebarMenuItem>
            <img className='shareProfileImg' src="assets/person/1.jpeg" alt="" />

              {userName}

            </CDBSidebarMenuItem>
            <button onClick={userLogout}  className="button3">
                Logout
              </button>

            {/* <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
            </NavLink> */}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          {/* <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div> */}
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
    </div>
  );
}

export default Sidebar;

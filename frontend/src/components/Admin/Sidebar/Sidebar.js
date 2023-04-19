import React from "react";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

import { setAdminLogout } from "../../../Redux/adminSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
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
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
            </NavLink> */}
            <NavLink  to="/adminn/users"  style={{ textDecoration: "none" }}  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Analytics
              </CDBSidebarMenuItem>
            </NavLink>

            <CDBSidebarMenuItem>
              
              <button onClick={adminLogout} className="button3">
                Logout
              </button>
            </CDBSidebarMenuItem>

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
  );
}

export default Sidebar;

import React from 'react'
import './Navbar.scss'



import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";


import { useSelector } from 'react-redux';


function Navbar() {
  // const userName=useSelector((state)=>state.user?.user?.user);


  
  return (
    <div className="userNavbar">
    <div className="wrapper">


    <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>

        <div className="right">
        <div className="user">
{/* 
        {userName && <p>Welcome, {userName}!</p>} */}

        </div>

        </div>
      </div>
    </div>

  )
}

export default Navbar





import React, { useState, useEffect, useContext } from "react";
import { baseUrl } from "../../../utils/Constants";
import { useSelector } from "react-redux";
import axios from "../../../utils/axios";
import Cookies from "js-cookie";
import AuthContext from "../../../context/AuthProvider";
import { styled } from "@mui/system";
import {
  Container,
  Box,
  Grid,
  Divider,
  TextField,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
// import "./ChatDetails.css";

const useStyles = styled((theme) => ({
  // table: {
  //   minWidth: 650,
  // },
  // chatSection: {
  //   width: "100%",
  //   height: "80vh",
  // },
  // headBG: {
  //   backgroundColor: "#e0e0e0",
  // },
  // borderRight500: {
  //   borderRight: "1px solid #e0e0e0",
  // },
  // messageArea: {
  //   height: "100vh",
  //   overflowY: "auto",
  // },
}));

function ChatPeople() {
  const classes = useStyles();
  const user_id = useSelector((state) => state.user?.user_id);
  const userName = useSelector((state) => state.user?.user);
  const profilePic = useSelector((state) => state.user?.profilePic);
  const [members, setMembers] = useState([]);


  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);

  let {
    contextData: { MessageDetails, roomid, setRoomid, isopen, setIsopen,updateFullName,fulName,chatUserPic,setchatUserPic,updatechatUserPic},
  } = useContext(AuthContext);

  const token = Cookies.get("jwt_user");

  let chatlist = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}chat/chatlists/${user_id}/`
      );
      if (response.status === 200) {
        setMembers(response.data);
        setFilteredMembers(response.data);
      } else {
        console.log("Error while fetching chat list");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    chatlist();
  }, []);








  function handleClick(id,fullname,profile_picture) {
    setIsopen(true);
    createroom(id);
    updateFullName(fullname);
    updatechatUserPic(profile_picture);
  }

  let createroom = async (usersid) => {
    try {
      const response = await axios.get(
        `${baseUrl}chat/create_or_find_room/${user_id}/${usersid}`
      );
      if (response.status === 200) {
        setRoomid(response.data);
        // console.log("Room ID:", response.data.id);
        MessageDetails(response.data.id); // Pass the roomid to MessageDetails
      } else {
        alert("Failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };


  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = members.filter((chat) =>
      chat.user.fullname.toLowerCase().includes(searchTerm)
    );
    setFilteredMembers(filtered);
  };



  return (


<Box sx={{ 
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}}>
  <List>
    <ListItemButton key="RemySharp">
      <ListItemIcon>
        <Avatar src={profilePic} alt="Profile Picture" />
      </ListItemIcon>
      <ListItemText
        primary={
          userName &&
          userName.charAt(0).toUpperCase() + userName.slice(1)
        }
      />
    </ListItemButton>
  </List>
  <Divider />
  <Box sx={{ padding: '10px' }}>
    <TextField
      id="outlined-basic-email"
      label="Search"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleSearch}
    />
  </Box>
  <Divider />
  <List sx={{ 
    flex: '1 1 auto',
    overflowY: 'auto',
  }}>    {filteredMembers.map((chat, i) => (
      <React.Fragment key={i}>
        <ListItemButton
          key={i}
          onClick={() => {
            handleClick(chat.user.id,chat.user.fullname,chat.user.profile_picture);
            MessageDetails(chat);
          }}
        >
          <ListItemIcon>
            <Avatar alt="Remy Sharp" src={chat.user.profile_picture} />
            
          </ListItemIcon>
          <ListItemText primary=  {chat.user.fullname && chat.user.fullname.charAt(0).toUpperCase() + chat.user.fullname.slice(1)} />
        </ListItemButton>
        <Divider />
      </React.Fragment>
    ))}
  </List>
</Box>





  );


}

export default ChatPeople;


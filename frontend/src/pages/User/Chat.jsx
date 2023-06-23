import React,{ useContext } from "react";
// import { useContext, useEffect, useState } from "react";
// import AuthContext from '../../context/AuthProvider';
import ChatDetails from '../../components/User/ChatComponents/ChatDetails'
import ChatPeople from "../../components/User/ChatComponents/ChatPeople";
import Sidebar from "../../components/User/Sidebar/Sidebar";
import AuthContext from "../../context/AuthProvider";
import { Container, Grid, Box,Divider, TextField, Typography, Avatar, Fab, Chip, Stack, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/system';


import Navbar from "../../components/User/Navbar/Navbar";
// import "./HomePage.scss";



const useStyles = styled((theme) => ({
  chatPeopleContainer: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
  chatDetailsContainer: {
    [theme.breakpoints.down('md')]: {
      order: -1,
    },
  },
}));




function Chat() {

  let { messageDetail, roomid ,setIsopen,isopen} = useContext(AuthContext)
  const classes = useStyles();

  return (
    <>
    <div >
    <Navbar />
    
    <div style={{ display: "flex" }}>
    <Sidebar/>

    <Container >
  <Grid container>
    <Grid item xs={4}>
      <Typography variant="h5" className="header-message">
        Chat
      </Typography>
    </Grid>
  </Grid>
  <Grid container>
    <Grid item xs={12} md={4}>
      <ChatPeople />
    </Grid>
    <Grid item xs={12} md={8}>
      <ChatDetails />
    </Grid>
  </Grid>
</Container>
    </div>
    {/* <div className="Rightbar">     
     
</div> */}
    </div>

  </>
  )
}

export default Chat
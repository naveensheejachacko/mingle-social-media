import React, { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import { useSelector } from "react-redux";

import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import { Container, Grid, Box,Divider, TextField, Typography, Avatar, Fab, Chip, Stack, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './ChatDetails.css'
import ChatPeople from './ChatPeople'
import Cookies from 'js-cookie';
import moment from 'moment';
import { baseUrl } from "../../../utils/Constants";


const useStyles = styled((theme) => ({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '100%',
    boxShadow: '0px 0px 16px -8px rgba(0,0,0,0.68)',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
    marginLeft:'20px',
  },
  sentMessage: {
    backgroundColor: '#6586fc',
    marginLeft: 'auto',
    borderRadius: '10px',
  },
  receivedMessage: {
    backgroundColor: '#6586fc',
    borderRadius: '10px',
  },
  chatBoxBottom: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: '20px',
    zIndex: 9999,
  },


}));

const ChatDetails = () => {
  const classes = useStyles();

  const user_id = useSelector((state) => state.user?.user_id);
  const userName = useSelector((state) => state.user?.user);
  const profilePic = useSelector((state) => state.user?.profilePic);
  // const token = Cookies.get('jwt_user');

  let { messageDetail, contextData: { roomid, setIsopen, isopen,fullName,chatUserPic} } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [isTrue, setIsTrue] = useState(false);

  const socketRef = useRef(null);
  let room = roomid.id;
  let chatUserName = fullName;
  let chatUserImage = chatUserPic

 

  const bottomRef = useRef(null);

  useEffect(() => {
    if (isopen && room) {
      // we should use `wss` while hosting because it should be secured
      socketRef.current = new WebSocket(`wss://api.mingle.fun/ws/chat/${room}/${user_id}/`);
      // socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${room}/${user_id}/`);

      socketRef.current.onmessage = (event) => {
        setIsTrue(!isTrue);
        // setMessages([...messages, JSON.parse(event.data)]);
      };

      return () => {
        socketRef.current.close();
      };
    }
  }, [messages, room]);

  const handleInputSubmit = () => {
    if (message.trim() === '') {
      // Message is empty
      return;
    }

    socketRef.current.send(message);
    setMessage('');
    // get_messages()
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (isopen && room) {
      get_messages();
    }
  }, [room, isTrue]);

  // getting messages
  let get_messages = async () => {
    try {
      const response = await fetch(`${baseUrl}chat/getMessages/${room}/`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        // console.log(data, 'message details');
      } else {
        alert('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (

      <Grid container className={classes.chatSection}  >



        {isopen === true ? (

<>


<span item xs={12} md={3} style={{ backgroundColor: '#d4d4d4', width: '100%' ,borderRadius:'10px'}}>
 
  <span style={{ width: '100%', fontWeight: 'bold', fontSize: 'medium'}}>
  <img src={chatUserImage} alt="Chat User" style={{margin:'5px' ,width:'50px',height:'50px',borderRadius:'50%'}}/>
    {chatUserName && chatUserName.charAt(0).toUpperCase() + chatUserName.slice(1)}
  </span>
</span>



          <Grid item xs={12} md={9}>
            <List className={classes.messageArea}  style={{ maxHeight: '500px',minHeight:'500px', overflowY: 'auto' }}>
              {messages.map((msg, index) => {
                const isSentMessage = msg.sender === user_id;
                return (
                  <Stack
                    key={msg.id}
                    spacing={1}
                    className={isSentMessage ? classes.sentMessage : classes.receivedMessage}
                    alignItems={isSentMessage ? "flex-end" : "flex-start"}
                  >
                    <Stack direction="column" spacing={1}>
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{
                          backgroundColor: isSentMessage ? '#DCF8C6' : '#ECECEC',
                          borderRadius: '10px',
                          padding: '8px',
                          marginLeft: isSentMessage ? '0' : '16px', 
                        }}
                      >               
                        {msg.message}
                      </Typography>
                      <Typography style={{marginLeft: isSentMessage ? '0' : '16px', }} variant="caption" component="div" color="primary">
                        {moment(msg.timestamp).fromNow()}
                      </Typography>
                    </Stack>
                  </Stack>
                );
              })}
              <div ref={bottomRef} />
            </List>
            <Divider />
            <Grid className={classes.chatBoxBottom} container>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  label="Type Something"
                  fullWidth
                />
              </Grid>
              <Grid xs={1} align="right">
                <Fab color="primary" aria-label="add">
                  <SendIcon onClick={handleInputSubmit} />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
          </>) : (
          <Grid item xs={12}>
            <Typography   style={{ backgroundColor: '#d4d4d4', width: '100%' ,borderRadius:'10px',fontWeight:'bold',fontSize:'50px'}} variant="h6" align="center">
              Please select a chat
            </Typography>
{/* <div >
<img src="https://res.cloudinary.com/dtnbd0res/image/upload/v1686754319/assets/chatlogo_b7xdlu.gif" alt="GIF Image"  />
</div> */}


          </Grid>

        )}
      </Grid>
    
  );
};

export default ChatDetails;

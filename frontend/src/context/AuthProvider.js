import { useState, useEffect, createContext } from "react";

import React from 'react'
const AuthContext = createContext({});
export const AuthProvider = ({children}) => {
    const[auth,setAuth] = useState("")
    const [messageDetail,setMessageDetail] = useState()
    const [roomid, setRoomid] = useState([]);
    const [isopen,setIsopen] = useState(false)
    const [fullName, setFullName] = useState('');
    const [chatUserPic,setchatUserPic] = useState('')
    let MessageDetails = (chat) =>{
      setMessageDetail(chat)
  }

  const updateFullName = (name) => {
    setFullName(name);
  };

  const updatechatUserPic= (userPic) =>{
    setchatUserPic(userPic)
  }
    let contextData={
      MessageDetails:MessageDetails,
      messageDetail:messageDetail,
      setMessageDetail:setMessageDetail,
      roomid:roomid,
      setRoomid:setRoomid,
      isopen:isopen,
      setIsopen:setIsopen, 
      fullName:fullName,
      updateFullName:updateFullName,
      chatUserPic:chatUserPic,
      setchatUserPic:chatUserPic,
      updatechatUserPic:updatechatUserPic
    
    }
  return (
    <AuthContext.Provider value={{auth,setAuth,contextData}} >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;

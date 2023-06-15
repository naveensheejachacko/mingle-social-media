import { useState, useEffect, createContext } from "react";

import React from 'react'
const AuthContext = createContext({});
export const AuthProvider = ({children}) => {
    const[auth,setAuth] = useState("")
    const [messageDetail,setMessageDetail] = useState()
    const [roomid, setRoomid] = useState([]);
    const [isopen,setIsopen] = useState(false)

    let MessageDetails = (chat) =>{
      setMessageDetail(chat)
  }
    let contextData={
      MessageDetails:MessageDetails,
      messageDetail:messageDetail,
      setMessageDetail:setMessageDetail,
      roomid:roomid,
      setRoomid:setRoomid,
      isopen:isopen,
      setIsopen:setIsopen,   

    
    
    }
  return (
    <AuthContext.Provider value={{auth,setAuth,contextData}} >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;

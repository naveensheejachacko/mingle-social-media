import { createSlice } from "@reduxjs/toolkit";


  
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token=action.payload.token;
      state.user_id=action.payload.user_id;
      state.email=action.payload.email;

    },
    logout: (state) => {
      state.user = null
      state.token=null
      state.user_id=null
      state.email=null
    },
    setPosts:(state,action)=>{
      state.posts=action.payload
  },
  setHomePosts:(state,action)=>{
    state.homePosts=action.payload
},
  },

});



export const { login, logout,setPost,setHomePosts} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer; 

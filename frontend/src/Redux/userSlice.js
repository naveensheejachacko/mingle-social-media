import { createSlice } from "@reduxjs/toolkit";


  
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setPosts:(state,action)=>{
      state.posts=action.payload
  },
    setPost:(state,action)=>{
    
      const updatedPost =  state.posts.map((post)=>{
         
          if(post.user_id ===  action.payload.user_id) return action.payload;
          return post;
      })
     
      state.posts=updatedPost
     
  },
  },

});



export const { login, logout,setPost,setPosts } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer; 

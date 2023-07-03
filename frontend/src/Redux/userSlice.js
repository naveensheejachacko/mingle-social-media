import { createSlice } from "@reduxjs/toolkit";


  
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    homePosts:[],
    explorePosts:[],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token=action.payload.token;
      state.user_id=action.payload.user_id;
      state.email=action.payload.email;
      state.profilePic=action.payload.profilePic

    },
    logout: (state) => {
      state.user = null
      state.token=null
      state.user_id=null
      state.email=null
      state.homePosts=null
    },
  //   setPosts:(state,action)=>{
  //     state.posts=action.payload
  // },
  setHomePosts:(state,action)=>{
    state.homePosts=action.payload;
},
setExplorePosts:(state,action)=>{
  state.explorePosts=action.payload;
},
  },

});



export const { login, logout,setHomePosts,setExplorePosts} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer; 

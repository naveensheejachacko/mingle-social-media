// import { createSlice } from '@reduxjs/toolkit'


// const userSlice=createSlice({
//     name:"user",
//     initialState:"",
//     reducers:{
//         setLogin:(state,action)=>{
//             state.user=action.payload.user;
//             state.token=action.action.payload.token;
//         },
//         setLogout:(state)=>{
//             state.user=null
//             state.token=null
//         }
//     }
// })

// export const{setLogin,setLogout}=userSlice.actions;
// export default userSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";



export const userSlice=createSlice({
    name:"user",
    initialState:{
        user:null
    },
    reducers:{
        login:(state,action)=>{
            state.user=action.payload;
        },
        logout:(state)=>{
            state.user=null;
        }
    }


})
export const{login,logout}=userSlice.actions;

export const selectUser=(state)=>state.user.user

export default userSlice.reducer; 
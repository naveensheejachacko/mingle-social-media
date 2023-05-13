import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import adminReducer from './adminSlice'
import {persistReducer} from "redux-persist";

import { persistConfig } from "./persistConfig";




// export const store= configureStore({
//    reducer:{
//     user:userReducer,
//     admin:adminReducer,
//     post: postReducer, 
//    }
// })

// export default store;


const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedAdminReducer = persistReducer(persistConfig, adminReducer);
// const persistedPostReducer = persistReducer(persistConfig, postReducer);

export const store= configureStore({
   reducer:{
    user:persistedUserReducer,
    admin:persistedAdminReducer,
   //  post: persistedPostReducer, 
   }
})



export default store;
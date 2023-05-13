import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

import userReducer from './userSlice'
import adminReducer from './adminSlice'
import postReducer from './postSlice'

export const persistConfig = {
  key: 'root',
  storage,
}


import { configureStore,combineReducers } from '@reduxjs/toolkit'
import {persistReducer,persistStore }from 'redux-persist'
import userSlice from './user/userSlice.js'

import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({user:userSlice})

const persistConfig = {
  key:'root',
  storage,
  version:1,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
  })
})

export const Persistor =persistStore (store);
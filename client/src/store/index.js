import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './userSlice'
import { mangaReducer } from './mangaSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    manga: mangaReducer
  },
})  
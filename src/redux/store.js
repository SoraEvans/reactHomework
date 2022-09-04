import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { chatsSlice, counterSlice } from './slice'

export default configureStore({
    reducer: combineReducers({
        chats: chatsSlice.reducer,
        profile: counterSlice.reducer,
    }),
})
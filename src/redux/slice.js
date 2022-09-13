import { createSlice } from '@reduxjs/toolkit'
import { STATUSES } from '../api/constants'
import { ref, set } from 'firebase/database'
import { database } from '../services/firebase'

const initialValue = {
    gists: [],
    request: STATUSES.IDLE,
    error: null,
}

export const counterSlice = createSlice({
    name: 'checkbox',
    initialState: false,
    reducers: {
        change: (state) => !state
    },
})

export const chatsSlice = createSlice({
    name: 'messages',
    initialState: [
        { name: 'chat1', id: 1, messages: [] },
        { name: 'chat2', id: 2, messages: [] },
        { name: 'chat3', id: 3, messages: [] }
    ],
    reducers: {
        addChats: (state) => {
            const count = state[state.length - 1].id + 1
            set(ref(database, 'chats'), [...state, { name: `chat${count}`, id: count, messages: [] }])
            return [...state, { name: `chat${count}`, id: count, messages: [] }]
        },
        removeChats: (state, action) => {
            set(ref(database, 'chats'), state.filter(item => item.id !== action.payload))
            return state.filter(item => item.id !== action.payload)
        },
        sendMessage: (state, action) => {
            const { id, author, text } = action.payload
            const changedValue = state.map(item => (
                item.name === id ? ({ ...item, messages: [...item.messages, { text, author }] }) : item
            ))
            set(ref(database, 'chats'), changedValue);
            return changedValue
        },
        getChats: (state, action) => action.payload,
        botAnswer: (_, action) => alert(action.payload)
    },
})

export const gistsSlice = createSlice({
    name: 'gists',
    initialState: initialValue,
    reducers: {
        getGistsSuccess: (state = initialValue, action) => ({
            ...state,
            gists: action.payload,
            request: STATUSES.SUCCESS,
        }),
        getGistsError: (state = initialValue, action) => ({
            ...state,
            request: STATUSES.FAILURE,
            error: action.payload,
        })
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        email: '',
        id: null,
        token: ''
    },
    reducers: {
        logIn: (state, action) => {
            const { email: userEmail, uid, accessToken } = action.payload.user
            return {
                email: userEmail,
                id: uid,
                token: accessToken
            }
        },
        logOut: (state) => {
            state.email = null
            state.token = null
            state.id = null
        },
    },
})

export const { addChats, removeChats, sendMessage, botAnswer, getChats } = chatsSlice.actions

export const { change } = counterSlice.actions
export const { logIn, logOut } = authSlice.actions
export const { getGistsSuccess, getGistsError } = gistsSlice.actions
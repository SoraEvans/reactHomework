import { createSlice } from '@reduxjs/toolkit'
import { STATUSES } from '../api/constants'

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

            return [...state, { name: `chat${count}`, id: count, messages: [] }]
        },
        removeChats: (state, action) => state.filter(item => item.id !== action.payload),
        sendMessage: (state, action) => {
            const { id, author, text } = action.payload

            return state.map(item => {
                return item.name === id ? ({ ...item, messages: [...item.messages, { text, author }] }) : item
            })
        },
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

export const { addChats, removeChats, sendMessage, botAnswer } = chatsSlice.actions

export const { change } = counterSlice.actions
export const { getGistsSuccess, getGistsError } = gistsSlice.actions
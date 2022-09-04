import { createSlice } from '@reduxjs/toolkit'

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
            alert(`Message sent ${author}`)

            return state.map(item => {
                return item.name === id ? ({ ...item, messages: [...item.messages, { text, author }] }) : item
            })
        }
    },
})


// Action creators are generated for each case reducer function
export const { addChats, removeChats, sendMessage } = chatsSlice.actions

export const { change } = counterSlice.actions
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'checkbox',
  initialState: false,
  reducers: {
    change: (state) => !state
  },
})

// Action creators are generated for each case reducer function
export const { change } = counterSlice.actions

export default counterSlice.reducer
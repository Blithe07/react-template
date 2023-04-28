import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userCode: '',
        userName: '',
        Authorization: '',
        auth: ''
    },
    reducers: {
        setUserInfo: (state, { payload }) => {
            Object.assign(state, payload)
        }
    }
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer
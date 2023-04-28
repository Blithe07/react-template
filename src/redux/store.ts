import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import reportSlice from './reportSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        report: reportSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

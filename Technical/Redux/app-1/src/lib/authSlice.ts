import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: typeof window !== 'undefined' ? localStorage.getItem('userToken') : null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem('userToken', action.payload)
        },
        logout: (state) => {
            state.token = null
            localStorage.removeItem('userToken')
        },
    },
})

export const { setToken, logout } = authSlice.actions
export default authSlice.reducer
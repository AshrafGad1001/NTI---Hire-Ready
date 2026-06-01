import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null as string | null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            if (typeof window !== 'undefined') {
                localStorage.setItem('userToken', action.payload)
            }
        },
        logout: (state) => {
            state.token = null
            if (typeof window !== 'undefined') {
                localStorage.removeItem('userToken')
            }
        },
        loadToken: (state) => {
            if (typeof window !== 'undefined') {
                state.token = localStorage.getItem('userToken')
            }
        },
    },
})

export const { setToken, logout, loadToken } = authSlice.actions
export default authSlice.reducer
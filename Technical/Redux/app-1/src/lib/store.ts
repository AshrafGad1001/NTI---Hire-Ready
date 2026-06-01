import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import cartReducer from './cartSlice'
import productsReducer from './productsSlice'

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        cart: cartReducer,
        products: productsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
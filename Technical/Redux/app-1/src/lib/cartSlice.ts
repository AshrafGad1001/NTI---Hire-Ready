import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const TOKEN = () => localStorage.getItem('userToken') ?? ''

// Fetch Cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: { token: TOKEN() }
    })
    return data
})

// Add To Cart
export const addToCart = createAsyncThunk('cart/addToCart', async (productId: string) => {
    const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId },
        { headers: { token: TOKEN() } }
    )
    return data
})

// Remove Item
export const removeItem = createAsyncThunk('cart/removeItem', async (productId: string) => {
    const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: { token: TOKEN() } }
    )
    return data
})

// Update Quantity
export const updateQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async ({ productId, count }: { productId: string; count: number }) => {
        const { data } = await axios.put(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { count },
            { headers: { token: TOKEN() } }
        )
        return data
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartData: null as any,
        cartCount: 0,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => { state.loading = true })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cartData = action.payload
                state.cartCount = action.payload.numOfCartItems
                state.loading = false
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cartData = action.payload
                state.cartCount = action.payload.numOfCartItems
            })
            .addCase(removeItem.fulfilled, (state, action) => {
                state.cartData = action.payload
                state.cartCount = action.payload.numOfCartItems
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.cartData = action.payload
            })
    }
})

export default cartSlice.reducer
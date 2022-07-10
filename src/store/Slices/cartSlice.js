import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {setError} from "./phoneSlice";


export const fetchCart = createAsyncThunk(
	'pizza/fetchCart',
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/cart');
			return data;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
)


const initialState = {
	cartOpened: false,
	cartItems: [],
	statusCart: 'cart idle',
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartItems: (state, action) => {
			state.cartItems = action.payload;
		},
		setCartOpened: (state) => {
			state.cartOpened = !state.cartOpened;
		},
		setStatusCart: (state, action) => {
			state.statusCart = action.payload;
		},
		
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCart.pending, (state) => {
			state.cartItems = [];
		})
		builder.addCase(fetchCart.fulfilled, (state, action) => {
			state.cartItems = action.payload;
		})
		builder.addCase(fetchCart.rejected, setError)
	}
})

export const { setCartItems, setCartOpened, setStatusCart } = cartSlice.actions

export default cartSlice.reducer
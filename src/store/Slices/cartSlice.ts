import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {Phone} from "./phoneSlice";


export const fetchCart = createAsyncThunk<Phone[]>(
	'pizza/fetchCart',
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/cart');
			return data;
		} catch (e: any) {
			return rejectWithValue(e.message);
		}
	}
)

interface CartInterface {
	cartOpened: boolean,
	cartItems: Phone[],
	statusCart: string,
}

const initialState: CartInterface = {
	cartOpened: false,
	cartItems: [],
	statusCart: 'cart idle',
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartItems: (state, action:PayloadAction<Phone[]>) => {
			state.cartItems = action.payload;
		},
		setCartOpened: (state, action:PayloadAction<boolean>) => {
		state.cartOpened = action.payload
		},
		setStatusCart: (state, action:PayloadAction<string>) => {
			state.statusCart = action.payload;
		},
		
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCart.pending, (state) => {
			state.cartItems = [];
		})
		builder.addCase(fetchCart.fulfilled, (state, action:PayloadAction<Phone[]>) => {
			state.cartItems = action.payload;
		})
		builder.addCase(fetchCart.rejected, (state, action:PayloadAction<any>) => {
			console.log(action.payload)
			state.statusCart = 'error';
		})
	}
})

export const { setCartItems, setCartOpened, setStatusCart } = cartSlice.actions

export default cartSlice.reducer
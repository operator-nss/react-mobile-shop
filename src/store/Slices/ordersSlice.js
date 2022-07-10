import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {setError} from "./phoneSlice";


export const fetchOrders = createAsyncThunk(
	'pizza/fetchOrders',
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/orders');
			return data;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
)


const initialState = {
	orders: [],
	orderId: null,
	statusOrder: 'idle'
}

export const ordersSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrders: (state, action) => {
			state.orders = action.payload;
		},
		setOrderId: (state, action) => {
			state.orderId = action.payload;
		},
		setStatusOrder: (state, action) => {
			state.statusOrder = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchOrders.pending, (state) => {
			state.favoriteItems = [];
		})
		builder.addCase(fetchOrders.fulfilled, (state, action) => {
			state.favoriteItems = action.payload;
		})
		builder.addCase(fetchOrders.rejected, setError)
	}
})

export const {setOrders, setOrderId, setStatusOrder} = ordersSlice.actions

export default ordersSlice.reducer
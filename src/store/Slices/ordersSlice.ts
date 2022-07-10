import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {Phone} from "./phoneSlice";


export const fetchOrders = createAsyncThunk<any[]>(
	'pizza/fetchOrders',
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/orders');
			return data;
		} catch (e: any) {
			return rejectWithValue(e.message);
		}
	}
)

interface OrdersInterface {
	orders: Phone[],
	orderId: number,
	statusOrder: string,
}


const initialState: OrdersInterface = {
	orders: [],
	orderId: 0,
	statusOrder: 'idle'
}

export const ordersSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrders: (state, action:PayloadAction<any[]>) => {
			state.orders = action.payload;
		},
		setOrderId: (state, action:PayloadAction<number>) => {
			state.orderId = action.payload;
		},
		setStatusOrder: (state, action:PayloadAction<string>) => {
			state.statusOrder = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchOrders.pending, (state) => {
			state.orders = [];
		})
		builder.addCase(fetchOrders.fulfilled, (state, action) => {
			state.orders = action.payload.reduce((prev: any, obj: any) => [...prev, ...obj.items], []);
		})
		builder.addCase(fetchOrders.rejected, (state, action:PayloadAction<any>) => {
			console.log(action.payload)
		})
	}
})

export const {setOrders, setOrderId, setStatusOrder} = ordersSlice.actions

export default ordersSlice.reducer
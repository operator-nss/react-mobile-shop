import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";


export const fetchPhones = createAsyncThunk(
	'pizza/fetchPhone',
		async (_, {rejectWithValue}) => {
		try {
			// const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
			// 	axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/cart'),
			// 	axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/favorites'),
			// 	axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/items'),
			// ]);
			// setItems(itemsResponse)
			const {data} = await axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/items');
			return data;
		} catch (e) {
			return rejectWithValue(e.message);
		}
		}
)

export const setError = (state, action) => {
	state.status = 'error';
	state.error = action.payload;
}

const initialState = {
	value: 0,
	phones: [],
	searchValue: '',
	status: 'phone loading',
	error: null,
}

export const phoneSlice = createSlice({
	name: 'phone',
	initialState,
	reducers: {
		setSearchValue: (state, action) => {
			state.searchValue = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPhones.pending, (state) => {
			state.status = 'phone loading';
			state.phones = [];
		})
		builder.addCase(fetchPhones.fulfilled, (state, action) => {
			state.phones = action.payload;
			state.status = 'phone success';
		})
		builder.addCase(fetchPhones.rejected, setError)
	}
	
})

export const { setSearchValue } = phoneSlice.actions

export default phoneSlice.reducer
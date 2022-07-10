import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {setError} from "./phoneSlice";
import {fetchCart} from "./cartSlice";


export const fetchFavorites = createAsyncThunk(
	'pizza/fetchFavorites',
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/favorites');
			return data;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
)


const initialState = {
	favoriteItems: [],
	statusFavorites: 'favorites idle',
}

export const favoritesSlice = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		setFavoriteItems: (state, action) => {
			state.favoriteItems = action.payload;
		},
		setStatusFavorites: (state, action) => {
			state.statusFavorites = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchFavorites.pending, (state) => {
			state.favoriteItems = [];
			state.statusFavorites = 'favorites loading';
		})
		builder.addCase(fetchFavorites.fulfilled, (state, action) => {
			state.favoriteItems = action.payload;
			state.statusFavorites = 'favorites success'
		})
		builder.addCase(fetchFavorites.rejected, setError)
	}
})

export const { setFavoriteItems, setStatusFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer
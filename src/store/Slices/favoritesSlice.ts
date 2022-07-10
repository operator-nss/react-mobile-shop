import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {Phone} from "./phoneSlice";


export const fetchFavorites = createAsyncThunk<Phone[]>(
	'pizza/fetchFavorites',
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/favorites');
			return data;
		} catch (e: any) {
			return rejectWithValue(e.message);
		}
	}
)


interface FavoritesInterface {
	favoriteItems: Phone[],
	statusFavorites: string,
}


const initialState: FavoritesInterface = {
	favoriteItems: [],
	statusFavorites: 'favorites idle',
}

export const favoritesSlice = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		setFavoriteItems: (state, action:PayloadAction<Phone[]>) => {
			state.favoriteItems = action.payload;
		},
		setStatusFavorites: (state, action:PayloadAction<string>) => {
			state.statusFavorites = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchFavorites.pending, (state) => {
			state.favoriteItems = [];
			state.statusFavorites = 'favorites loading';
		})
		builder.addCase(fetchFavorites.fulfilled, (state, action:PayloadAction<Phone[]>) => {
			state.favoriteItems = action.payload;
			state.statusFavorites = 'favorites success'
		})
		builder.addCase(fetchFavorites.rejected, (state, action:PayloadAction<any>) => {
			console.log(action.payload)
		})
	}
})

export const { setFavoriteItems, setStatusFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer
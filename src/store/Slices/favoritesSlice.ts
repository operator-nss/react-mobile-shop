import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Phone} from "./phoneSlice";
import {fetchFavorites} from "../asyndActions";


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
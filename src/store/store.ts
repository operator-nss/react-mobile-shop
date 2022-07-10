import { configureStore } from '@reduxjs/toolkit'
import phone from './Slices/phoneSlice'
import cart from './Slices/cartSlice'
import favorite from './Slices/favoritesSlice'
import order from './Slices/ordersSlice'
import {useDispatch} from "react-redux";

export const store = configureStore({
	reducer: {
		phone,
		cart,
		favorite,
		order
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
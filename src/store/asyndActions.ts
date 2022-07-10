import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Phone} from "./Slices/phoneSlice";

export const fetchPhones = createAsyncThunk<Phone[]>(
    'pizza/fetchPhone',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/items');
            return data;
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
)

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

export const fetchOrders = createAsyncThunk<Phone[]>(
    'pizza/fetchOrders',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/orders');
            return data
        } catch (error) {
            console.error(error);
        }
    }
)

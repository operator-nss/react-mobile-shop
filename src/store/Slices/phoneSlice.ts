import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchPhones} from "../asyndActions";


export interface Phone {
    id: string,
    imageUrl: string,
    title: string,
    price: number,
    realId: string
}

interface PhonesInterface {
    phones: Phone[],
    searchValue: string,
    status: string,
    error: any
}

const initialState: PhonesInterface = {
    phones: [],
    searchValue: '',
    status: 'phone loading',
    error: null,
}

export const phoneSlice = createSlice({
    name: 'phone',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPhones.pending, (state) => {
            state.status = 'phone loading';
            state.phones = [];
        })
        builder.addCase(fetchPhones.fulfilled, (state, action: PayloadAction<Phone[]>) => {
            state.phones = action.payload;
            state.status = 'phone success';
        })
        builder.addCase(fetchPhones.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'error';
            state.error = action.payload;
        })
    }

})

export const {setSearchValue} = phoneSlice.actions

export default phoneSlice.reducer
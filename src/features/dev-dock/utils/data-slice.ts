import { createSlice } from '@reduxjs/toolkit';
import { ViewMode } from '../data/type';

const initialState = {
    dataViewMode: ViewMode.FAKE_DATA,
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setDataViewMode: (state, action) => {
            state.dataViewMode = action.payload;
        },
    },
});

export const { setDataViewMode } = dataSlice.actions;

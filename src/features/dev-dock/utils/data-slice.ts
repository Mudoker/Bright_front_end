import { createSlice } from '@reduxjs/toolkit';
import { ViewMode } from '../data/type';

const initialState = {
    current: ViewMode.FAKE_DATA,
};

export const dataSlice = createSlice({
    name: 'dataViewMode',
    initialState,
    reducers: {
        setDataViewMode: (state, action) => {
            state.current = action.payload;
        },
    },
});

export const { setDataViewMode } = dataSlice.actions;

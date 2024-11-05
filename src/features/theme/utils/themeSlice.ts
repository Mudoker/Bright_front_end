import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: localStorage.getItem('currentTheme') || 'light-default',
};

export const themeSlice = createSlice({
    name: 'currentTheme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('currentTheme', state.value);
        },
    },
});

export const { setTheme } = themeSlice.actions;

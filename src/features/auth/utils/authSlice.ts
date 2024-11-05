// Import createSlice from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Import RootState from the Redux store configuration
import { RootState } from '../../../config/redux/store';

// Define the initial state, retrieving values from localStorage if they exist
const initialState = {
    // isAuthenticated: localStorage.getItem('isAuthenticated') || JSON.stringify(false), // This line is commented out
    userName: localStorage.getItem('userName') || null, // Get userName from localStorage
    token: localStorage.getItem('token') || null, // Get token from localStorage
};

// Create a slice for managing authentication state
export const authSlice = createSlice({
    name: 'userLoginStatus', // Name of the slice
    initialState, // Set the initial state
    reducers: {
        // Reducer to handle setting login status
        setLoginStatus: (state, action) => {
            const metaData = action.payload.data.payload; // Extract metadata from action payload
            state.userName = metaData.userData.fullname; // Update userName in state
            state.token = metaData.accessToken; // Update token in state

            // Store the updated values in localStorage
            localStorage.setItem(
                'userName',
                JSON.stringify(metaData.userData.fullname)
            );
            localStorage.setItem('token', metaData.accessToken);
        },
        // Reducer to handle logging out
        logOut: (state, action) => {
            // state.isAuthenticated = JSON.stringify(false); // This line is commented out
            state.userName = null; // Clear userName in state
            state.token = null; // Clear token in state

            // Remove authentication-related items from localStorage
            localStorage.removeItem('userName');
            localStorage.removeItem('token');
        },
    },
});

// Export the actions for use in components
export const { setLoginStatus, logOut } = authSlice.actions;

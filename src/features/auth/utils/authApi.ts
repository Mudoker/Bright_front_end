// Import the base API slice configuration
import { apiSlice } from '@/config/api/apiSlice';

// Extend the base API slice with authentication-related endpoints
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Define the login endpoint
        login: builder.mutation({
            query: body => ({
                url: 'auth/bright/login', // API endpoint for login
                method: 'POST', // HTTP method
                body: { ...body }, // Request body
            }),
        }),

        // Define the signup endpoint
        signup: builder.mutation({
            query: body => ({
                url: 'auth/signup/email', // API endpoint for signup
                method: 'POST', // HTTP method
                body, // Request body
            }),
        }),

        // Define the logout endpoint
        logout: builder.mutation({
            query: () => ({
                url: 'auth/bright/logout', // API endpoint for logout
                method: 'POST', // HTTP method
            }),
        }),
    }),
});

// Export hooks for using the defined endpoints in components
export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
    authApiSlice;

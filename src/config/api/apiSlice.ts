import { API_BASE_URL } from '@/config/constants/strings.global';
import { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
    BaseQueryFn,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

// Base query configuration using fetchBaseQuery, which defines the base URL and prepares headers for every request.
const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL, // Set the base URL for all API requests

    // Function to prepare headers before each request
    prepareHeaders: (headers, { getState }) => {
        // Get the token from localStorage
        const token = localStorage.getItem('token');

        // If the token exists, add the Authorization header with the Bearer token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        // Return the modified headers
        return headers;
    },
});

// Extended base query with re-authentication logic to handle token expiration
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (
    args, // Arguments for the API call (URL, method, etc.)
    api, // API object containing state and dispatch functions
    extraOptions // Any extra options that can be passed to the query
) => {
    // Make the initial API call with the baseQuery
    let result = await baseQuery(args, api, extraOptions);

    // Check if the response returns a 401 Unauthorized error, indicating an expired or invalid token
    if (result.error && result.error.status === 401) {
        // Token is either expired or unauthorized, so remove it from localStorage
        localStorage.removeItem('token');

        // Redirect the user to the login page for re-authentication
        window.location.href = '/auth';
    }

    // Return the result of the API call (or error)
    return result;
};

// Create the API slice using the re-authentication enabled base query
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth, // Use the base query with token expiration handling

    // Define the API endpoints (to be implemented based on application needs)
    endpoints: builder => ({
        // Define your endpoints here (e.g., GET, POST requests to different routes)
    }),
});

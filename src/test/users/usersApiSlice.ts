import { apiSlice } from '@/config/api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/test',
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetUsersQuery } = usersApiSlice;

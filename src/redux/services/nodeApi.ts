// services/nodeApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const nodeApi = createApi({
  reducerPath: 'nodeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_BACKEND_URL, 
    credentials: 'include',         
  }),
  endpoints: (builder) => ({
    addWatchList: builder.mutation<{ message: string }, {userId: number, mediaId: string, mediaType: string; mediaTitle: string;  mediaPoster: any }>({
      query: (addList) => ({
        url: '/api/add-watchlist',
        method: 'POST',
        body: addList,
      }),
    }),
    getWatchList: builder.mutation<{ message: string }, { userId: number; }>({
      query: (watchList) => ({
        url: '/api/get-watchlist',
        method: 'POST',
        body: watchList,
      }),
    }),
    deleteWatchList: builder.mutation<{ message: string }, { email: string; }>({
      query: (deleteList) => ({
        url: '/api/delete-watchlist',
        method: 'DELETE',
        body: deleteList,
      }),
    }),
  }),
});

export const { useAddWatchListMutation, useGetWatchListMutation, useDeleteWatchListMutation } = nodeApi;

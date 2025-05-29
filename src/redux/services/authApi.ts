// services/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://movie-backend-r2ws.onrender.com', 
    credentials: 'include',         
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/api/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<{ message: string }, { email: string; password: string }>({
      query: (userData) => ({
        url: '/api/register',
        method: 'POST',
        body: userData,
      }),
    }),
    forgetPassword: builder.mutation<{ message: string }, { email: string; }>({
      query: (userData) => ({
        url: '/api/forget-password',
        method: 'POST',
        body: userData,
      }),
    }),
     resetPassword: builder.mutation<{ message: string }, { email: string; newPassword: string }>({
      query: (userData) => ({
        url: '/api/reset-password',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useForgetPasswordMutation, useResetPasswordMutation } = authApi;

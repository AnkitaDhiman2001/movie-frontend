import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import { tmdbApi } from './services/tmdb';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(tmdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

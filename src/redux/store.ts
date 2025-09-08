import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import { tmdbApi } from './services/tmdb';
import { nodeApi } from './services/nodeApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [nodeApi.reducerPath] : nodeApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(tmdbApi.middleware).concat(nodeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

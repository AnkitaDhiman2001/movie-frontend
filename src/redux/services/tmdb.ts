import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TMDB_API_KEY = '5b25f6484cc9e97f55dde715f7bd58b1';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
  }),
  endpoints: (builder) => ({
      getAllTrending: builder.query<any, void>({
      query: () => `trending/all/week?api_key=${TMDB_API_KEY}`,
    }),
    getTrendingMovies: builder.query<any, void>({
      query: () => `trending/movie/week?api_key=${TMDB_API_KEY}`,
    }),
    getTrendingTVShows: builder.query<any, void>({
      query: () => `trending/tv/week?api_key=${TMDB_API_KEY}`,
    }),
      getPopularMovies: builder.query<any, void>({
      query: () => `movie/popular?api_key=${TMDB_API_KEY}`,
    }),
      getPopularTVShows: builder.query<any, void>({
      query: () => `tv/popular?api_key=${TMDB_API_KEY}`,
    }),
    searchMulti: builder.query<any, string>({
      query: (query) => `search/multi?api_key=${TMDB_API_KEY}&query=${query}`,
    }),
      getMovieDetails: builder.query<any, string>({
      query: (id) => `movie/${id}?api_key=${TMDB_API_KEY}`,
    }),
      getTVDetails: builder.query<any, string>({
      query: (id) => `tv/${id}?api_key=${TMDB_API_KEY}`,
    }),
  }),
});

export const {
  useGetAllTrendingQuery,
  useGetTrendingMoviesQuery,
  useGetTrendingTVShowsQuery,
  useGetPopularMoviesQuery,
  useGetPopularTVShowsQuery,
  useLazySearchMultiQuery,
  useGetMovieDetailsQuery,
  useGetTVDetailsQuery
} = tmdbApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_MOVIEDB_URL,
  }),
  endpoints: (builder) => ({
      getAllTrending: builder.query<any, void>({
      query: () => `trending/all/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    }),
    getTrendingMovies: builder.query<any, void>({
      query: () => `trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    }),
    getTrendingTVShows: builder.query<any, void>({
      query: () => `trending/tv/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    }),
      getPopularMovies: builder.query<any, void>({
      query: () => `movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    }),
      getPopularTVShows: builder.query<any, void>({
      query: () => `tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    }),
    searchMulti: builder.query<any, string>({
      query: (query) => `search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`,
    }),
      getMovieDetails: builder.query<any, string>({
      query: (id) => `movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    }),
      getTVDetails: builder.query<any, string>({
      query: (id) => `tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    }),
      getRecommendations: builder.query<any, any>({
      query: (args) => {
         const { mediaType, id } = args;
                return {
                    url: `${mediaType}/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                }
      }
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
  useGetTVDetailsQuery,
  useGetRecommendationsQuery
} = tmdbApi;

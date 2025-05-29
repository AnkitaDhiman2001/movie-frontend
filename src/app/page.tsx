'use client';
import React from 'react';
import MovieList from '@/components/MovieList';
import { useGetAllTrendingQuery, useGetPopularMoviesQuery, useGetPopularTVShowsQuery } from '@/redux/services/tmdb';
import Loader from '@/components/Loader';


const HomePage: React.FC = () => {
       const { data: all, isLoading: loadingAll } = useGetAllTrendingQuery();
     const { data: movies, isLoading: loadingMovies } = useGetPopularMoviesQuery();
      const { data: tvShows, isLoading: loadingTV } = useGetPopularTVShowsQuery();
            if (loadingAll || loadingMovies || loadingTV) return <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                  <Loader />
                </div>
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to Civvy </h1>
        <p className="text-lg md:text-xl mt-4">Your ultimate destination for movies and TV shows.</p>
      </div>
      
      <MovieList items={all?.results?.slice(0, 10)} title="Trending Now" media_type={'all'}/>
      <MovieList items={movies?.results?.slice(0, 10)} title="Featured Movies" media_type={'movie'}/> 
      <MovieList items={tvShows?.results?.slice(0, 10)} title="Popular TV Shows" media_type={'tv'}/>
    </div>
  );
};

export default HomePage;

    'use client';
    import React from 'react';
    import MovieList from '@/components/MovieList';
    import { useGetPopularMoviesQuery } from '@/redux/services/tmdb';
import Loader from '@/components/Loader';

    const MoviesPage: React.FC = () => {
        const { data: movies, isLoading: loadingMovies } = useGetPopularMoviesQuery();
          if (loadingMovies) return <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <Loader />
              </div>
      return (
    <div>
      <MovieList items={movies?.results} title="All Movies" media_type={'movie'}/>
        </div>
      );
    };

    export default MoviesPage;
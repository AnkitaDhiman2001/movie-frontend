    'use client';
    import React from 'react';
    import MovieList from '@/components/MovieList';
    import { useGetPopularTVShowsQuery } from '@/redux/services/tmdb';
import Loader from '@/components/Loader';

    const TvShowsPage: React.FC = () => {
      const { data: tvShows, isLoading: loadingTvShows } = useGetPopularTVShowsQuery();
          if (loadingTvShows) return <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <Loader />
              </div>
      return (
    <div>
      <MovieList items={tvShows?.results} title="All Tv shows" media_type={'tv'}/>
        </div>
      );
    };

    export default TvShowsPage;
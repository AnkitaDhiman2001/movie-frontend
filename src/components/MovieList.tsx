import React from 'react';
import { MediaItem } from '@/types';
import MovieCard from './MovieCard';

interface MovieListProps {
  items: MediaItem[];
  title?: string;
  media_type: string;
}

const MovieList: React.FC<MovieListProps> = ({ items, title, media_type }) => {
  if (!items || items.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No items to display.</p>
      </div>
    );
  }

  return (
    <section className="py-8">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 px-4">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 px-4">
        {items.map((item) => (
          <MovieCard key={item.id} item={item} media_type={media_type}/>
        ))}
      </div>
    </section>
  );
};

export default MovieList;
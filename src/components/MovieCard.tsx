import React from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
import { MediaItem } from '@/types';

interface MovieCardProps {
  item: MediaItem;
  media_type: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ item, media_type }) => {
  const detailUrl = `/details/${item.media_type ? item.media_type : media_type}/${item.id}`;

  return (
    <Link href={detailUrl} legacyBehavior>
      <a className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 duration-300 ease-in-out cursor-pointer">
      <div className="relative w-full h-0 pb-[150%]">
        <Image
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title ?? item.name ?? 'Poster'}
          fill
          style={{ objectFit: 'cover' }}
            className="rounded-t-lg"
            unoptimized={!item.poster_path}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate" title={item.title ?? item.name}>
          {item.title ?? item.name}
        </h3>
          {(item.release_date || item.first_air_date) && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {new Date(item.release_date || item.first_air_date!).getFullYear()}
          </p>
        )}
          {typeof item.vote_average === 'number' && item.vote_average !== undefined && (
          <div className="mt-2 flex items-center">
            <svg
              className="w-5 h-5 text-yellow-400 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-gray-700 dark:text-gray-300 font-semibold">
              {item.vote_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>
      </a>
    </Link>
  );
};

export default MovieCard;
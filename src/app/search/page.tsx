'use client';

import React, { useState, useEffect } from 'react';
import MovieList from '@/components/MovieList';
import { useLazySearchMultiQuery } from '@/redux/services/tmdb';
import Loader from '@/components/Loader';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState('');

  const [triggerSearch, { data: searchResults, isLoading: loadingResults }] = useLazySearchMultiQuery();


 useEffect(() => {
  if (searchTerm.trim() === '') {
    setHasSearched(false);
  }

  const handler = setTimeout(() => {
    setDebouncedTerm(searchTerm.trim());
  }, 1000);

  return () => clearTimeout(handler);
}, [searchTerm]);

useEffect(() => {
  if (debouncedTerm) {
    triggerSearch(debouncedTerm);
    setHasSearched(true);
  } else {
    setHasSearched(false);
  }
}, [debouncedTerm, triggerSearch]);



  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();

    if (!trimmed) {
      setHasSearched(false);
      return;
    }

    setDebouncedTerm(trimmed); 
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Search Movies & TV Shows
      </h1>

      <form onSubmit={handleSearch} className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies, TV shows..."
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg w-full sm:w-2/3 md:w-1/2 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg
                     transition-colors duration-200 w-full sm:w-auto"
        >
          Search
        </button>
      </form>

      {loadingResults && (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
              <Loader />
            </div>
      )}

      {hasSearched && searchResults?.results?.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No results found for "{debouncedTerm}". Try a different search.
        </p>
      )}

      {hasSearched && searchResults?.results?.length > 0 && (
        <MovieList items={searchResults.results} title="Search Results" media_type={'all'} />
      )}

      {!hasSearched && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Enter a search term above to find movies and TV shows.
        </p>
      )}
    </div>
  );
};

export default SearchPage;

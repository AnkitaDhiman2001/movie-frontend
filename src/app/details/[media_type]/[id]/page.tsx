"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useGetMovieDetailsQuery, useGetTVDetailsQuery } from '@/redux/services/tmdb';
import { MovieDetails, TVDetails } from '@/types';

const DetailPage: React.FC = () => {
  const params = useParams();
  const mediaType = params.media_type as 'movie' | 'tv';
  const id = params.id as string;
  
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
  const [availableEpisodes, setAvailableEpisodes] = useState<number[]>([]);

  const { data: movieData, error: movieError, isLoading: movieLoading } = useGetMovieDetailsQuery(id, {
    skip: !id || mediaType !== 'movie',
  });

  const { data: tvData, error: tvError, isLoading: tvLoading } = useGetTVDetailsQuery(id, {
    skip: !id || mediaType !== 'tv',
  });

  const isLoading = mediaType === 'movie' ? movieLoading : tvLoading;
  const error = mediaType === 'movie' ? movieError : tvError;
  const data: MovieDetails | TVDetails | undefined = mediaType === 'movie' ? movieData : tvData;

  useEffect(() => {
    if (mediaType === 'tv' && data) {
      const tvShow = data as TVDetails;
      const season = tvShow.seasons?.find(s => s.season_number === selectedSeason);
      if (season) {
        const episodes = Array.from({ length: season.episode_count }, (_, i) => i + 1);
        setAvailableEpisodes(episodes);
        setSelectedEpisode(1); 
      }
    }
  }, [selectedSeason, data, mediaType]);


  useEffect(() => {
    if (mediaType === 'tv' && data) {
      const tvShow = data as TVDetails;
      if (tvShow.seasons && tvShow.seasons.length > 0) {
        const firstSeason = tvShow.seasons.find(s => s.season_number > 0) || tvShow.seasons[0];
        setSelectedSeason(firstSeason.season_number);
      }
    }
  }, [data, mediaType]);

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <p className="text-xl text-gray-700 dark:text-gray-300">Loading details...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <p className="text-xl text-red-500">Error loading details. Please try again later.</p>
    </div>
  );

  if (!data) return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <p className="text-xl text-gray-500">Details not found.</p>
    </div>
  );

  const title = mediaType === 'movie' ? (data as MovieDetails).title : (data as TVDetails).name;
  const releaseDate = mediaType === 'movie' ? (data as MovieDetails).release_date : (data as TVDetails).first_air_date;
  const runtime = mediaType === 'movie' ? (data as MovieDetails).runtime : undefined;
  const episodeRunTime = mediaType === 'tv' ? (data as TVDetails).episode_run_time : undefined;
  const numberOfSeasons = mediaType === 'tv' ? (data as TVDetails).number_of_seasons : undefined;
  const numberOfEpisodes = mediaType === 'tv' ? (data as TVDetails).number_of_episodes : undefined;
  const createdBy = mediaType === 'tv' ? (data as TVDetails).created_by : undefined;
  const seasons = mediaType === 'tv' ? (data as TVDetails).seasons : undefined;

  const {
    overview,
    poster_path,
    backdrop_path,
    vote_average,
    genres,
    tagline,
    credits,
    videos,
  } = data;



  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClosePlayer = () => {
    setIsPlaying(false);
  };

  const getStreamUrl = () => {
    if (mediaType === 'movie') {
      return `https://player.videasy.net/movie/${data.id}`;
    } else {
      return `https://player.videasy.net/tv/${data.id}/${selectedSeason || 1}/${selectedEpisode || 1}`;  
    }
  };

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeason(parseInt(event.target.value));
  };

  const handleEpisodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEpisode(parseInt(event.target.value));
  };

  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-white">
      {isPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-black rounded-lg overflow-hidden">
            <button
              onClick={handleClosePlayer}
              className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
              aria-label="Close player"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {mediaType === 'tv' && (
              <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-70 text-white p-3 rounded-lg">
                <p className="text-sm font-semibold">
                  {title} - Season {selectedSeason}, Episode {selectedEpisode}
                </p>
              </div>
            )}

            <div className="w-full h-full">
              <iframe
                src={getStreamUrl()}
                title={mediaType === 'movie' ? `Playing ${title}` : `Playing ${title} S${selectedSeason}E${selectedEpisode}`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                sandbox="allow-scripts allow-same-origin allow-presentation"
                referrerPolicy="origin"      
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {backdrop_path && (
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
          <Image
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt={`${title} backdrop`}
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg flex items-center space-x-3 transition-all transform hover:scale-105 shadow-xl"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span className="text-xl font-semibold">
                {mediaType === 'movie' ? 'Play Movie' : `Play S${selectedSeason}E${selectedEpisode}`}
              </span>
            </button>
          </div>
        </div>
      )}

      <div className="md:flex md:space-x-8">
        <div className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
          {poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title ?? 'Poster'}
              width={500}
              height={750}
              className="rounded-lg shadow-xl mx-auto md:mx-0"
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <div className="w-full h-[450px] bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500">
              No Poster
            </div>
          )}
       
        </div>

        <div className="md:w-2/3 lg:w-3/4">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{title}</h1>
          {tagline && <p className="text-lg italic text-gray-400 mb-4">{tagline}</p>}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm">
            {releaseDate && (
              <span>{mediaType === 'movie' ? 'Release:' : 'First Aired:'} {new Date(releaseDate).toLocaleDateString()}</span>
            )}
            {runtime && <span>Runtime: {runtime} min</span>}
            {episodeRunTime && episodeRunTime.length > 0 && (
              <span>Episode Runtime: {episodeRunTime.join(', ')} min</span>
            )}
            {vote_average && vote_average > 0 ? (
              <span className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                {vote_average.toFixed(1)}
              </span>
            ) : null}
          </div>
          
          {mediaType === 'tv' && (
            <div className="mb-4 text-sm">
              {numberOfSeasons && <p>Total Seasons: {numberOfSeasons}</p>}
              {numberOfEpisodes && <p>Total Episodes: {numberOfEpisodes}</p>}
              {createdBy && createdBy.length > 0 && (
                <p>Created by: {createdBy.map(creator => creator.name).join(', ')}</p>
              )}
            </div>
          )}

                {mediaType === 'tv' && seasons && seasons.length > 0 && (
            <div className="mt-4 space-y-3">
              <div>
                <label htmlFor="season-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Season
                </label>
                <select
                  id="season-select"
                  value={selectedSeason}
                  onChange={handleSeasonChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {seasons
                    .filter(season => season.season_number >= 0) 
                    .sort((a, b) => a.season_number - b.season_number)
                    .map((season) => (
                      <option key={season.id} value={season.season_number}>
                        {season.season_number === 0 ? 'Specials' : `Season ${season.season_number}`}
                        {season.episode_count && ` (${season.episode_count} episodes)`}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="episode-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Episode
                </label>
                <select
                  id="episode-select"
                  value={selectedEpisode}
                  onChange={handleEpisodeChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {availableEpisodes.map((episodeNum) => (
                    <option key={episodeNum} value={episodeNum}>
                      Episode {episodeNum}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {genres && genres.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span key={genre.id} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {overview && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{overview}</p>
            </div>
          )}

          {credits && credits.cast && credits.cast.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Cast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {credits.cast.slice(0, 10).map((member) => (
                  <div key={member.id} className="text-center">
                    {member.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                        alt={member.name}
                        width={185}
                        height={278}
                        className="rounded-lg mx-auto mb-2 shadow-md"
                        style={{ objectFit: 'cover', height: '180px', width: '120px' }}
                      />
                    ) : (
                      <div className="w-[120px] h-[180px] bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 mx-auto mb-2 text-xs">No Image</div>
                    )}
                    <p className="font-semibold text-sm">{member.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{member.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

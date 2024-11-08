'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

// Types
interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  coverArtUrl: string;
  favorited?: boolean;
  watchLater?: boolean;
}

interface MovieCardProps {
  movie: Movie;
  toggleFavorite?: (movieId: string) => void;
  toggleWatchLater?: (movieId: string) => void;
}

// API utilities
const updateMovieStatus = async (endpoint: string, movieId: string, method: 'POST' | 'DELETE') => {
  const response = await fetch(`/api/${endpoint}/${movieId}`, { method });
  if (!response.ok) {
    throw new Error(`Failed to update ${endpoint}`);
  }
  return response;
};

// Components
const StatusIcon = ({ 
  isActive, 
  activeIcon, 
  inactiveIcon, 
  alt, 
  onClick, 
  disabled 
}: {
  isActive: boolean;
  activeIcon: string;
  inactiveIcon: string;
  alt: string;
  onClick: () => void;
  disabled: boolean;
}) => (
  <img
    src={isActive ? activeIcon : inactiveIcon}
    alt={alt}
    className={`h-6 w-6 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={onClick}
  />
);

const MovieInfo = ({ title, released, synopsis, genre }: { 
  title: string; 
  released: number; 
  synopsis: string; 
  genre: string;
}) => (
  <div className="absolute space-y-5 bottom-0 left-0 w-full h-0 opacity-0 group-hover:h-[40%] lg:group-hover:h-[47%] group-hover:opacity-100 transition-all duration-500 ease-in-out bg-navy bg-opacity-75 p-4">
    <h3 className="text-lg font-semibold text-white">
      {title} ({released})
    </h3>
    <p className="text-sm line-clamp-2 text-white">{synopsis}</p>
    <div className="flex flex-wrap gap-2 mt-2">
      <span className="bg-teal text-blue px-2 py-1 rounded-full text-xs">
        {genre}
      </span>
    </div>
  </div>
);

const MovieCard: React.FC<MovieCardProps> = ({ movie, toggleFavorite, toggleWatchLater }) => {
  // State
  const [isFavorited, setIsFavorited] = useState(movie.favorited || false);
  const [isWatchLater, setIsWatchLater] = useState(movie.watchLater || false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync with prop changes
  useEffect(() => {
    setIsFavorited(movie.favorited || false);
    setIsWatchLater(movie.watchLater || false);
  }, [movie.favorited, movie.watchLater]);

  // Event handlers
  const handleStatusUpdate = useCallback(async (
    endpoint: 'favorites' | 'watch-later',
    currentStatus: boolean,
    setStatus: (value: boolean) => void,
    callback?: (movieId: string) => void
  ) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await updateMovieStatus(endpoint, movie.id, currentStatus ? 'DELETE' : 'POST');
      setStatus(!currentStatus);
      if (callback) callback(movie.id);
    } catch (error) {
      console.error(`Error updating ${endpoint}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, movie.id]);

  const handleFavoriteToggle = useCallback(() => 
    handleStatusUpdate('favorites', isFavorited, setIsFavorited, toggleFavorite),
  [handleStatusUpdate, isFavorited, toggleFavorite]);

  const handleWatchLaterToggle = useCallback(() => 
    handleStatusUpdate('watch-later', isWatchLater, setIsWatchLater, toggleWatchLater),
  [handleStatusUpdate, isWatchLater, toggleWatchLater]);

  return (
    <div className="rounded-lg overflow-hidden shadow-md border-teal border-2 relative group h-[45vh]">
      <Image
        src={movie.coverArtUrl}
        alt={`${movie.title} cover art`}
        width={200}
        height={300}
        className="w-full h-full object-cover"
      />
      
      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
        <StatusIcon
          isActive={isFavorited}
          activeIcon="/assets/star-solid.svg"
          inactiveIcon="/assets/star.svg"
          alt="Favorite"
          onClick={handleFavoriteToggle}
          disabled={isLoading}
        />
        <StatusIcon
          isActive={isWatchLater}
          activeIcon="/assets/clock-solid.svg"
          inactiveIcon="/assets/clock.svg"
          alt="Watch Later"
          onClick={handleWatchLaterToggle}
          disabled={isLoading}
        />
      </div>

      <MovieInfo
        title={movie.title}
        released={movie.released}
        synopsis={movie.synopsis}
        genre={movie.genre}
      />
    </div>
  );
};

export default MovieCard;

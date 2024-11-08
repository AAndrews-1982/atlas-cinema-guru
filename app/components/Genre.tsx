'use client';

import { useState, useEffect } from 'react';

interface GenreProps {
  onError?: (error: string) => void;
}

const Genre: React.FC<GenreProps> = ({ onError }) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/genres');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.genres || !Array.isArray(data.genres)) {
          throw new Error('Invalid genre data received');
        }
        
        setGenres(data.genres);
        setError(null);

      } catch (error) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'Failed to fetch genres';
        
        console.error('Genre fetch error:', error);
        setError(errorMessage);
        
        if (onError) {
          onError(errorMessage);
        }

      } finally {
        setIsLoading(false);
      }
    };

    fetchGenreData();
  }, [onError]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <span className="text-teal">Loading genres...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4" role="alert">
        <p>Error loading genres. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {genres.map((genre) => (
        <div
          key={genre}
          className="bg-teal text-blue px-4 py-2 rounded-full text-center"
        >
          {genre}
        </div>
      ))}
    </div>
  );
};

export default Genre;
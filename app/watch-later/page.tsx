'use client';

import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  favorited?: boolean;
  watchLater?: boolean;
}

export default function WatchLaterPage() {
  const [watchLaterMovies, setWatchLaterMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  // Fetch user's watch later movies
  const fetchWatchLaterMovies = async (page: number) => {
    try {
      const response = await fetch(`/api/watch-later?page=${page}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();

      if (data.watchLater) {
        setWatchLaterMovies(data.watchLater);
        setTotalPages(Math.ceil(data.watchLater.length / itemsPerPage));
      } else {
        setWatchLaterMovies([]); // Clear movies if nothing is returned
      }
    } catch (error) {
      console.error('Error fetching watch later movies:', error);
    }
  };

  useEffect(() => {
    fetchWatchLaterMovies(currentPage); // Fetch movies when the page changes
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Toggle the watch later status for a specific movie
  const toggleWatchLater = (movieId: string) => {
    setWatchLaterMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId) // Remove movie from list on unlike
    );
  };

  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8 py-10 mt-5">Watch Later</h1>

      {/* Display movies for the current page */}
      <MovieList
        movies={watchLaterMovies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
        toggleWatchLater={toggleWatchLater}  // Pass the toggleWatchLater function
      />

      {/* Pagination controls */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  );
}
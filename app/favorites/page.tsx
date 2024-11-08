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
}

const ITEMS_PER_PAGE = 9;

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/favorites?page=${currentPage}`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const data = await response.json();
        const favoriteMovies = data.favorites || [];
        setFavorites(favoriteMovies);
        setTotalPages(Math.ceil(favoriteMovies.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [currentPage]);

  const toggleFavorite = (movieId: string) => {
    setFavorites(prevFavorites => prevFavorites.filter(movie => movie.id !== movieId));
  };

  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8 py-10 mt-5">Favorites</h1>
      
      <MovieList
        movies={favorites.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)}
        toggleFavorite={toggleFavorite}
      />
      
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
}

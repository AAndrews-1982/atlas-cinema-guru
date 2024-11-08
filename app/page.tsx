'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Filters from './components/Filters'; 
import MovieList from './components/MovieList'; 
import Pagination from './components/Pagination'; 

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  coverArtUrl: string;
}

const ITEMS_PER_PAGE = 9;

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  // Fetch all movies on initial load
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await fetch(`/api/titles`);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        if (data.titles) {
          setAllMovies(data.titles);
          setFilteredMovies(data.titles); // Initially set filtered movies to all movies
          setTotalPages(Math.ceil(data.titles.length / ITEMS_PER_PAGE));
        } else {
          setAllMovies([]);
          setFilteredMovies([]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (status === 'authenticated') {
      fetchAllMovies();
    }
  }, [status]);

  // Filter functionality
  const applyFilters = (filters: { search: string; minYear: string; maxYear: string; genres: string[] }) => {
    const { search, minYear, maxYear, genres } = filters;
    let filtered = allMovies;

    if (search) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (minYear) {
      filtered = filtered.filter(movie => movie.released >= parseInt(minYear));
    }
    if (maxYear) {
      filtered = filtered.filter(movie => movie.released <= parseInt(maxYear));
    }
    if (genres.length > 0) {
      filtered = filtered.filter(movie => genres.includes(movie.genre));
    }

    setFilteredMovies(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null; // Return null while redirecting
  }

  return (
    <>
      <Header user={session.user} />
      <main className="p-6">
        <h1>Welcome to Cinema Guru, {session.user?.email}</h1>
        <Filters onFiltersChange={applyFilters} />
        <MovieList movies={filteredMovies.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </main>
    </>
  );
}

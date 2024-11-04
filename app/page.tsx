'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  image: string;
}

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  // Fetch all movies on initial load
  const fetchAllMovies = async () => {
    try {
      const response = await fetch(`/api/titles`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();

      if (data.titles) {
        setAllMovies(data.titles);
        setFilteredMovies(data.titles); // Initially, set filtered movies to all movies
        setTotalPages(Math.ceil(data.titles.length / itemsPerPage));
      } else {
        setAllMovies([]);
        setFilteredMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchAllMovies();
    }
  }, [status]);

  // Handle client-side filtering
  const handleFiltersChange = (filters: { search: string; minYear: string; maxYear: string; genres: string[] }) => {
    let filtered = allMovies;

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply year filters
    if (filters.minYear) {
      filtered = filtered.filter(movie => movie.released >= parseInt(filters.minYear));
    }

    if (filters.maxYear) {
      filtered = filtered.filter(movie => movie.released <= parseInt(filters.maxYear));
    }

    // Apply genre filters
    if (filters.genres.length > 0) {
      filtered = filtered.filter(movie =>
        filters.genres.includes(movie.genre)
      );
    }

    setFilteredMovies(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
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
        {/* Filters */}
        <Filters onFiltersChange={handleFiltersChange} />
        
        {/* Movie List */}
        <MovieList movies={filteredMovies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} />

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </main>
    </>
  );
}

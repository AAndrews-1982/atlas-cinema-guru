"use client";
import MovieList from "@/components/MovieList";
import PageButtons from "@/components/PageButtons";
import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  image: string;
}

export default function Page() {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const moviesPerPage = 6;

  // Fetch function with proper error handling
  async function fetchAllMovies() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/favorites?page=${currentPage}`);
      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }

      const data = await response.json();

      // Ensure `data.favorites` is an array
      const favoritesArray = Array.isArray(data.favorites) ? data.favorites : [];

      setAllMovies(favoritesArray);
      setTotalPages(Math.ceil(favoritesArray.length / moviesPerPage) || 1);
    } catch (err) {
      console.error("Error fetching favorites: ", err);
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch upon initial load and page change
  useEffect(() => {
    fetchAllMovies();
  }, [currentPage]);

  // Ensure `allMovies` is always an array before using `.slice()`
  const paginatedMovies = (allMovies || []).slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

return (
  <div className="flex flex-col mb-0 justify-center">
    <div className="search-filter w-full p-4 pb-0 mb-2 flex flex-col items-center justify-center text-white">
      <h2 className="text-5xl font-bold mb-2">Favorites</h2>
      <PageButtons
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>

    <div className="w-auto p-5 mx-0 flex flex-col justify-center">
      {paginatedMovies.length > 0 ? (
        <MovieList movieList={paginatedMovies} />
      ) : (
        <p className="text-center text-gray-400 text-lg">No favorites added yet.</p>
      )}
    </div>
  </div>
);
}

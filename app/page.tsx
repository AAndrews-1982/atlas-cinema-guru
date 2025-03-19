"use client";
import GenreFilter from "@/components/GenreFilter";
import MovieList from "@/components/MovieList";
import PageButtons from "@/components/PageButtons";
import SearchFilter from "@/components/SearchFilter";
import { useEffect, useState } from "react";

// Define Movie interface
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
  const [query, setQuery] = useState<string>("");
  const [minYear, setMinYear] = useState<number | undefined>();
  const [maxYear, setMaxYear] = useState<number | undefined>();
  const [genres, setGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const moviesPerPage = 6;

  // Fetch movies from API
  async function fetchAllMovies() {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.append("query", query);
      if (minYear) params.append("minYear", minYear.toString());
      if (maxYear) params.append("maxYear", maxYear.toString());
      if (genres.length > 0) params.append("genres", genres.join(","));
      params.append("page", currentPage.toString());
  
      const fetchURL = `/api/titles?${params.toString()}`;
      console.log("Fetching from:", fetchURL);
  
      const response = await fetch(fetchURL);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
  
      const data = await response.json();
      if (!data.titles || !Array.isArray(data.titles)) {
        throw new Error("Invalid API response structure.");
      }
  
      setAllMovies(data.titles);
      setFilteredMovies(data.titles);


      if (data.totalMovies) {
      setTotalPages(Math.ceil(data.totalMovies / moviesPerPage)); // Use `totalMovies` from API
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setIsLoading(false);
    }
  }  

  // Filter movies when search filters change
  useEffect(() => {
    let filtered = allMovies;
    if (query) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (minYear) {
      filtered = filtered.filter((movie) => movie.released >= minYear);
    }
    if (maxYear) {
      filtered = filtered.filter((movie) => movie.released <= maxYear);
    }
    if (genres.length > 0) {
      filtered = filtered.filter((movie) => genres.includes(movie.genre));
    }
  
    setFilteredMovies(filtered);
  }, [query, minYear, maxYear, genres, allMovies]); // Fix: Don't modify total pages here
  
  // Fetch movies on initial load or when page changes
  useEffect(() => {
    fetchAllMovies();
  }, [currentPage]);

  const paginatedMovies = filteredMovies; // No need to slice since the API handles pagination

  return (
    <div className="flex flex-col mb-0 justify-center">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen w-full text-white text-lg font-semibold">
          Movies Loading...
        </div>
      ) : (
        <>
          {/* Search & Filter Section */}
          <div className="search-filter w-full p-4 pb-0 mb-2 flex flex-wrap justify-between text-white">
            <SearchFilter
              onSearch={(query, minYear, maxYear) => {
                setQuery(query);
                setMinYear(minYear);
                setMaxYear(maxYear);
              }}
            />
            <GenreFilter onGenreSelect={(selectedGenres) => setGenres(selectedGenres)} />
          </div>

          {/* Movie List */}
          <div className="w-auto p-5 mx-0 flex flex-col justify-center">
            <MovieList movieList={paginatedMovies} />
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <PageButtons
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

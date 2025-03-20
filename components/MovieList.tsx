"use client";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  image: string;
}

interface MovieListProps {
  movieList: Movie[];
  totalMovies: number;
}

const MovieList = ({ movieList, totalMovies }: MovieListProps) => {
  console.log("Rendering MovieList with movies:", movieList); // Debugging

  const moviesPerPage = 6; // Define movies per page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [visibleMovies, setVisibleMovies] = useState<Movie[]>([]);

  // State for tracking favorite and watch later movies
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [watchLater, setWatchLater] = useState<Set<string>>(new Set());

  // Fetch user's favorites and watch later movies
  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const [favoritesRes, watchLaterRes] = await Promise.all([
          fetch("/api/favorites"),
          fetch("/api/watch-later"),
        ]);

        const favoritesData = await favoritesRes.json();
        const watchLaterData = await watchLaterRes.json();

        setFavorites(new Set(favoritesData.favorites?.map((movie: Movie) => movie.id) || []));
        setWatchLater(new Set(watchLaterData.watchLater?.map((movie: Movie) => movie.id) || []));
      } catch (err) {
        console.error("Error fetching favorites and watch later data:", err);
      }
    };
    fetchFlags();
  }, []);

  // Update the displayed movies based on the current page
  useEffect(() => {
    console.log(`Current Page: ${currentPage}`);
    console.log("Total Movies Available:", totalMovies);
    console.log("Full Movie List (Before Slicing):", movieList);
  
    const startIdx = (currentPage - 1) * moviesPerPage;
    const endIdx = startIdx + moviesPerPage;
  
    const slicedMovies = movieList.slice(startIdx, endIdx);
    console.log("Sliced Movies (Movies to Display):", slicedMovies);
  
    setVisibleMovies(slicedMovies);
  }, [currentPage, movieList]);
  

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {visibleMovies.length > 0 ? (
          visibleMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={{
                ...movie,
                favorited: favorites.has(movie.id),
                watchLater: watchLater.has(movie.id),
              }}
            />
          ))
        ) : (
          <h2 className="text-white text-2xl">No titles found.</h2>
        )}
      </div>
    </div>
  );
};

export default MovieList;

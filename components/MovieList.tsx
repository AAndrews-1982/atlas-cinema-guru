"use client";

import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";

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
}

const MovieList = ({ movieList }: MovieListProps) => {
  console.log("Rendering MovieList with movies:", movieList); // Debugging

  // Storing favorites and watchLaters in a set for optimized lookups
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [watchLater, setWatchLater] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const [favoritesRes, watchLaterRes] = await Promise.all([
          fetch("/api/favorites"),
          fetch("/api/watch-later"),
        ]);

        const favoritesData = await favoritesRes.json();
        const watchLaterData = await watchLaterRes.json();

        const favoritesArray = Array.isArray(favoritesData.favorites)
          ? favoritesData.favorites
          : [];
        const watchLaterArray = Array.isArray(watchLaterData.watchLater)
          ? watchLaterData.watchLater
          : [];

        setFavorites(new Set(favoritesArray.map((movie: Movie) => movie.id)));
        setWatchLater(new Set(watchLaterArray.map((movie: Movie) => movie.id)));
      } catch (err) {
        console.error("Error fetching favorites and watch later data:", err);
      }
    };
    fetchFlags();
  }, []);

  return (
    <div className="px-24 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:gap-x-16 lg:gap-x-8 gap-y-4 mb-3">
        {movieList && movieList.length > 0 ? (
          movieList.map((movie) => (
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

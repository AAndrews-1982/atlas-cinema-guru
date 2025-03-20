"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import StarOutline from "@/assets/icons/staroutline.svg";
import StarFull from "@/assets/icons/starfull.svg";
import ClockOutline from "@/assets/icons/clockoutline.svg";
import ClockFull from "@/assets/icons/clockfull.svg";

// Define Movie interface
interface Movie extends Record<string, any> {
  id: string;
  title: string;
  synopsis?: string;
  released: number;
  genre?: string;
  favorited: boolean;
  watchLater?: boolean;
  image?: string;
}

// Define props type
interface MovieProps {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieProps) => {
  // State to track if the movie is in "Favorites" or "Watch Later"
  const [inFavorites, setInFavorites] = useState<boolean>(false);
  const [inWatchLater, setInWatchLater] = useState<boolean>(false);

  // Update state when movie data changes (e.g., when fetched from API)
  useEffect(() => {
    setInFavorites(movie.favorited ?? false);
    setInWatchLater(movie.watchLater ?? false);
  }, [movie.favorited, movie.watchLater]);

  // Function to toggle "Favorites" status
  const toggleFavorite = async (id: string) => {
    setInFavorites((prev) => !prev);
    await fetch(`/api/favorites/${id}`, {
      method: inFavorites ? "DELETE" : "POST", // Remove if already favorited, add otherwise
    });
  };

  // Function to toggle "Watch Later" status
  const toggleWatchLater = async (id: string) => {
    setInWatchLater((prev) => !prev);
    await fetch(`/api/watch-later/${id}`, {
      method: inWatchLater ? "DELETE" : "POST", // Remove if already in watch later, add otherwise
    });
  };
  
  return (
    <div className="relative group shadow-lg border border-teal rounded-lg overflow-hidden w-full aspect-square">
      {/* Movie Image */}
      <img
        src={movie.image}
        alt={movie.title}
        width={400}
        height={400}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
  
      {/* Favorite & Watch Later Icons (Top Right) */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button onClick={() => toggleFavorite(movie.id)}>
          <Image
            src={inFavorites ? StarFull.src : StarOutline.src}
            alt="Favorites Icon"
            width={35}
            height={35}
            className="group-hover:scale-110 transition-transform duration-200"
            style={{
              filter: inFavorites
                ? "brightness(0) saturate(100%) invert(92%) sepia(59%) saturate(4585%) hue-rotate(358deg) brightness(99%) contrast(102%)"
                : "none",
            }}
          />
        </button>
        <button onClick={() => toggleWatchLater(movie.id)}>
          <Image
            src={inWatchLater ? ClockFull.src : ClockOutline.src}
            alt="Watch Later Icon"
            width={35}
            height={35}
            className="group-hover:scale-110 transition-transform duration-200"
            style={{
              filter: inWatchLater
                ? "brightness(0) saturate(100%) invert(92%) sepia(59%) saturate(4585%) hue-rotate(358deg) brightness(99%) contrast(102%)"
                : "none",
            }}
          />
        </button>
      </div>
  
      {/* Blue Overlay & Text */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-navy opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex flex-col justify-end p-4">
        <h1 className="text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
          {movie.title} ({movie.released})
        </h1>
        <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
          {movie.synopsis}
        </p>
        <div className="mt-2 px-3 py-2 rounded-full bg-teal text-black text-sm w-fit opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
          {movie.genre}
        </div>
      </div>
    </div>
  );
}  

export default MovieCard;

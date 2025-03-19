"use client";
import Link from "next/link";
import StarOutline from "@/assets/icons/staroutline.svg";
import StarFull from "@/assets/icons/starfull.svg";
import ClockOutline from "@/assets/icons/clockoutline.svg";
import ClockFull from "@/assets/icons/clockfull.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  favorited: boolean;
  watchLater: boolean;
  image: string;
}

type MovieProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieProps) {
  console.log("🎬 Movie Data:", movie); // ✅ Debugging
  const [inFavorites, setInFavorites] = useState<boolean>(movie.favorited);
  const [inWatchLater, setInWatchLater] = useState<boolean>(movie.watchLater);

  const toggleFavorite = async (id: string) => {
    // console.log("favorite button pressed");
    setInFavorites((prev) => !prev);
    // makes api call, posts if not in faves, deletes if it is
    const response = await fetch(`/api/favorites/${id}`, {
      method: inFavorites ? "DELETE" : "POST",
    });
  };

  const toggleWatchLater = async (id: string) => {
    setInWatchLater((prev) => !prev);
    // makes api call, posts if not in watchlater, deletes if it is
    const response = await fetch(`/api/watch-later/${id}`, {
      method: inWatchLater ? "DELETE" : "POST",
    });
  };

  useEffect(() => {
    setInFavorites(movie.favorited);
    setInWatchLater(movie.watchLater);
  }, [movie.favorited, movie.watchLater]);

 //Debugging: Log movie data inside the function
 console.log("Movie Data:", movie);
 console.log("MovieCard image:", movie?.image);
 
  
  return (
    <div className="relative group shadow-lg border-2 border-teal rounded-2xl h-full w-full">
      <img
        src={movie.image}
        alt={movie.title}
        width={200}
        height={300}
        className="size-96 rounded-2xl object-cover w-full aspect-square"
      />

      {/* Overlay */}
      <div className="absolute h-fit top-3 right-3 flex opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
        <button onClick={() => toggleFavorite(movie.id)} className="px-3">
          <Image
            src={inFavorites ? StarFull.src : StarOutline.src}
            alt="Favorites Icon"
            width={30}
            height={30}
            className="object-cover transition-transform duration-200 transform group-hover:scale-105"
          />
        </button>
        <button onClick={() => toggleWatchLater(movie.id)}>
          <Image
            src={inWatchLater ? ClockFull.src : ClockOutline.src}
            alt="Watch Later Icon"
            width={30}
            height={30}
            className="object-cover transition-transform duration-200 transform group-hover:scale-105"
          />
        </button>
      </div>
      <div className="rounded-b-2xl absolute bottom-0 left-0 right-0 h-1/2 bg-navy opacity-0 group-hover:opacity-90 transition-opacity duration-200 flex flex-col p-4 text-left">
        <h1 className="text-lg mb-2">
          {movie.title} ({movie.released})
        </h1>
        <p className="mb-6 text-sm">{movie.synopsis}</p>
        <div className="genre rounded-full bg-teal p-2 w-fit gap-2 text-black">
          {movie.genre}
        </div>
      </div>
    </div>
  );
}

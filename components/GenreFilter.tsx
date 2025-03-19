"use client";

import { useEffect, useState } from "react";

interface GenreFilterProps {
  onGenreSelect: (genres: string[]) => void;
}

export default function GenreFilter({ onGenreSelect }: GenreFilterProps) {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      const response = await fetch("/api/genres");
      const data = await response.json();
      setGenres(data.genres.slice(0, 10)); // Ensures exactly 10 genres
    }
    fetchGenres();
  }, []);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  useEffect(() => {
    onGenreSelect(selectedGenres);
  }, [selectedGenres, onGenreSelect]);

  return (
    <div className="w-full lg:w-auto flex flex-col lg:ml-12 lg:-mt-2 lg:items-end">
      <div className="text-lg text-white mb-1 lg:mb-2"><h2>Genres</h2>
      </div>
      <div className="grid grid-cols-5 gap-2">
  {genres.map((genre) => (
    <button
      key={genre}
      onClick={() => toggleGenre(genre)}
      className={`border-2 border-teal rounded-full px-3 py-1 text-sm ${selectedGenres.includes(genre) ? "bg-teal text-black" : "bg-navy"}`}
    >
      {genre}
    </button>
  ))}
  </div>
</div>
  );
}

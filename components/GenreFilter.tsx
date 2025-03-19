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
    <div className="flex flex-1 flex-col p-0 max-w-md">
      <div className="mb-3">
          <h2>Genres</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
                    <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`border-2 border-teal rounded-full p-1 ${selectedGenres.includes(genre) ? "bg-teal text-black" : "bg-navy"}`}
                  >
                    {genre}
                  </button>
        ))}
      </div>
    </div>
  );
}

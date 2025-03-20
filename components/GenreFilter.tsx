"use client";
import { useEffect, useState } from "react";

// Define Props Interface
interface GenreFilterProps {
  onGenreSelect: (genres: string[]) => void;
}

export default function GenreFilter({ onGenreSelect }: GenreFilterProps) {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Fetch genres from API on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/genres");
        if (!response.ok) throw new Error("Failed to fetch genres");

        const data = await response.json();
        setGenres(data.genres.slice(0, 10)); // Ensure exactly 10 genres
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // Toggle selected genre state
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  // Update parent component when selected genres change
  useEffect(() => {
    onGenreSelect(selectedGenres);
  }, [selectedGenres, onGenreSelect]);


  // Button Styling
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

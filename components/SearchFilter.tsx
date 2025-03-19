"use client";
import { useEffect, useState } from "react";

interface SearchFilterProps {
  onSearch: (query: string, minYear: number, maxYear: number) => void;
}

export default function SearchFilter({ onSearch }: SearchFilterProps) {
  const [query, setQuery] = useState("");
  const [minYear, setMinYear] = useState<string>("");
  const [maxYear, setMaxYear] = useState<string>("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(query, Number(minYear) || 1900, Number(maxYear) || 2024);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, minYear, maxYear, onSearch]);

  return (
    <div className="flex flex-col lg:flex-row w-full items-start lg:items-center justify-between gap-6">
      {/* Search Fields */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <h2 className="text-lg text-white mb-1">Search</h2>
        <input
          type="text"
          placeholder="Search Movies..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-teal rounded-full bg-navy text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal"
        />

        <div className="flex flex-row gap-4 mt-2">
          <div className="flex flex-col w-1/2">
            <h2 className="text-sm text-white mb-1">Min Year</h2>
            <input
              type="number"
              placeholder="1990"
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
              className="w-full p-2 border border-teal rounded-full bg-navy text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal"
            />
          </div>

          <div className="flex flex-col w-1/2">
            <h2 className="text-sm text-white mb-1">Max Year</h2>
            <input
              type="number"
              placeholder="2024"
              value={maxYear}
              onChange={(e) => setMaxYear(e.target.value)}
              className="w-full p-2 border border-teal rounded-full bg-navy text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

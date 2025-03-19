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
    <div className="flex-1 flex flex-col p-0 mb-4 max-w-md">
      <div className="flex flex-col mb-4">
        <h2>Search</h2>
        <input
          type="text"
          placeholder="Search Movies..."
          onChange={(e) => setQuery(e.target.value)}
          className="border-2 border-teal rounded-full p-1 bg-navy"
        />
      </div>
      <div className="flex flex-row space-x-4">
        <div className="flex flex-col w-full">
            <h2>Min Year</h2>
            <input type="text" placeholder="1990" value={minYear || ""} className="border-2 border-teal rounded-full p-1 bg-navy" onChange={(e) => setMinYear(Number(e.target.value))}/>
        </div>
        <div className="flex flex-col w-full">
            <h2>Max Year</h2>
            <input type="text" placeholder="2024" value={maxYear || ""} className="border-2 border-teal rounded-full p-1 bg-navy" onChange={(e) => setMaxYear(Number(e.target.value))}/>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

// Define a function type for handling search operations
type SearchHandler = (query: string, minYear: number, maxYear: number) => void;

// Interface for the SearchFilter component props
// Ensures that the component receives an `onSearch` function that adheres to the `SearchHandler` type
interface SearchFilterProps {
  onSearch: SearchHandler; // Function to execute when search criteria change
}


export default function SearchFilter(props: SearchFilterProps) {
  const { onSearch } = props; // Destructure props for clarity
  const [query, setQuery] = useState<string>("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");


  useEffect(() => {
    // Function to perform the search with the current state values
    const performSearch = () => {
      onSearch(query, Number(minYear) || 1900, Number(maxYear) || 2024);
    };
  
    // Sets a timeout to delay the execution of `performSearch` to prevent excessive API calls
    const debounce = setTimeout(performSearch, 300);
  
    // Cleanup function to clear the timeout if dependencies change before the function executes
    return () => clearTimeout(debounce);
  }, [query, minYear, maxYear, onSearch]); // Dependencies: Trigger effect when any of these values change
  
  

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

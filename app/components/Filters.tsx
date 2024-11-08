
'use client';

import { useState, useEffect } from 'react';

// Types
interface FiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  minYear: string;
  maxYear: string;
  genres: string[];
}

// Component
const Filters: React.FC<FiltersProps> = ({ onFiltersChange }) => {
  // State management
  const [filterState, setFilterState] = useState<FilterState>({
    search: '',
    minYear: '',
    maxYear: '',
    genres: []
  });
  const [allGenres, setAllGenres] = useState<string[]>([]);

  // Fetch genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('/api/genres');
        const data = await response.json();
        setAllGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  // Update parent component when filters change
  useEffect(() => {
    const trimmedFilters = {
      ...filterState,
      search: filterState.search.trim(),
      minYear: filterState.search.trim(),
      maxYear: filterState.maxYear.trim()
    };
    onFiltersChange(trimmedFilters);
  }, [filterState, onFiltersChange]);

  // Event handlers
  const handleInputChange = (field: keyof FilterState, value: string) => {
    setFilterState(prev => ({ ...prev, [field]: value }));
  };

  const toggleGenre = (genre: string) => {
    setFilterState(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  // Styled components
  const inputClassName = "p-2 border bg-navy border-teal rounded-full w-full text-white";
  const labelClassName = "text-lg text-white font-semibold ms-3";
  const genreButtonClassName = (selected: boolean) => `
    cursor-pointer 
    border 
    border-teal 
    rounded-full 
    px-4 
    py-2 
    text-center
    ${selected ? 'bg-teal text-blue' : 'bg-transparent text-white'}
  `;

  return (
    <div className="p-10 rounded-md shadow-md w-full h-auto">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-5">
        {/* Search and Year Filters Section */}
        <div className="flex flex-col space-y-4 relative">
          <label className={labelClassName}>Search</label>
          <input
            type="text"
            value={filterState.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            placeholder="Search..."
            className={inputClassName}
          />

          <div className="flex space-x-4">
            <div>
              <label className={`${labelClassName} text-md mb-4`}>Min Year</label>
              <input
                type="number"
                value={filterState.minYear}
                onChange={(e) => handleInputChange('minYear', e.target.value)}
                placeholder="Min Year"
                className={inputClassName}
              />
            </div>
            <div>
              <label className={`${labelClassName} text-md mb-4`}>Max Year</label>
              <input
                type="number"
                value={filterState.maxYear}
                onChange={(e) => handleInputChange('maxYear', e.target.value)}
                placeholder="Max Year"
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        {/* Genres Section */}
        <div className="flex flex-col">
          <label className={`${labelClassName} mb-4`}>Genres</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allGenres.map(genre => (
              <div
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={genreButtonClassName(filterState.genres.includes(genre))}
              >
                {genre}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;

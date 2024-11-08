<<<<<<< HEAD
=======
'use client';

import MovieCard from './MovieCard';
import Image from 'next/image';

// Types
interface Movie {
  id: string;
  title: string;
  coverArtUrl: string;
}

interface MovieListProps {
  movies: Movie[];
}

// Components
const MovieTile: React.FC<{ movie: Movie }> = ({ movie }) => (
  <div className="rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105">
    <Image
      src={movie.coverArtUrl}
      alt={`${movie.title} cover art`}
      width={200}
      height={300}
      className="w-full h-full object-cover"
      priority={false}
      loading="lazy"
    />
    <div className="p-2">
      <p className="font-semibold text-gray-800 line-clamp-1" title={movie.title}>
        {movie.title}
      </p>
    </div>
  </div>
);

const EmptyState: React.FC = () => (
  <div className="col-span-full flex justify-center items-center">
    <p className="text-teal py-10 text-lg font-semibold ps-2" role="status">
      No movies found.
    </p>
  </div>
);

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const hasMovies = movies.length > 0;

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mx-5 md:mx-10"
      role="list"
      aria-label="Movie list"
    >
      {hasMovies ? (
        movies.map((movie) => (
          <div key={movie.id} role="listitem">
            <MovieCard movie={movie} />
          </div>
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default MovieList;
>>>>>>> 25e2ed2 (still not able to load images)

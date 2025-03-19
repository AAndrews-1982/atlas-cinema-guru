"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Clock } from "lucide-react";

// Movie interface
interface Movie {
  id: string;
  title: string;
  released: number;
  genre: string;
  favorited: boolean;
  watchLater: boolean;
  image: string;
  synopsis: string;
}

export default function Page() {
  return (
    <Suspense>
      <WatchLaterPage />
    </Suspense>
  );
}

function WatchLaterPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get current page from URL or default to 1
  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string)
    : 1;

  // Fetch watch-later movies based on current page
  useEffect(() => {
    async function fetchWatchLater() {
      setLoading(true);
      try {
        const response = await fetch(`/api/watch-later?page=${currentPage}`);
        if (!response.ok) {
          throw new Error("Failed to fetch watch later movies");
        }

        const data = await response.json();

        // Mark all movies as watchLater
        const watchLaterMovies = (data.watchLater || []).map((movie: Movie) => ({
          ...movie,
          watchLater: true,
        }));

        setMovies(watchLaterMovies);
        setTotalPages(Math.ceil((data.watchLater?.length || 0) / 6) || 1);
      } catch (error) {
        console.error("Error fetching watch later movies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWatchLater();
  }, [currentPage]);

  // Function to remove a movie from watch-later
  const toggleWatchLater = async (e: React.MouseEvent, movieId: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await fetch(`/api/watch-later/${movieId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMovies(movies.filter((movie) => movie.id !== movieId));
      }
    } catch (error) {
      console.error("Error removing watch later:", error);
    }
  };

  // Function to navigate to a different page
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/watch-later?${params.toString()}`);
  };

  if (loading && movies.length === 0) {
    return <div className="flex justify-center p-12">Loading watch later movies...</div>;
  }

  if (!loading && movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-3xl font-bold text-white mb-4">Watch Later</h1>
        <p className="text-xl text-gray-300 mb-8">
          You haven't added any movies to your watch later list yet.
        </p>
        <Link
          href="/"
          className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full"
        >
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full transition-all">
      <div className="flex justify-center my-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
          Watch Later
        </h1>
      </div>

      {/* Movie grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-1 mb-12 w-full">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative group transition-all duration-300 hover:z-10 hover:scale-110 hover:shadow-xl"
          >
            <Link href={`/movies/${movie.id}`}>
              <div className="flex border-2 border-teal-200 relative rounded-lg overflow-hidden shadow-lg h-80">
                {/* Clock Icon */}
                <div
                  className="absolute top-2 right-2 z-10 cursor-pointer p-1 rounded-full bg-[#00003c]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => toggleWatchLater(e, movie.id)}
                >
                  <Clock size={24} fill={movie.watchLater ? "#FFD700" : "transparent"} color="white" />
                </div>

                {movie.image ? (
                  <img
                    src={movie.image}
                    alt={`${movie.title} poster`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">No poster available</span>
                  </div>
                )}

                {/* Movie info overlay */}
                <div className="absolute h-full w-full bg-[#00003c]/10">
                  <div className="absolute bottom-0 left-0 right-0 h-4/10 bg-[#00003c]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                    <div className="p-4">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        {movie.title} ({movie.released})
                      </h1>
                      <p className="text-sm text-teal-200 mt-2">{movie.synopsis}</p>
                      <p className="text-sm text-gray-300 mt-2">{movie.genre}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-5 py-4 w-28 text-navy bg-teal rounded-l-full"
        >
          Previous
        </button>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-5 py-4 w-28 text-navy bg-teal rounded-r-full"
        >
          Next
        </button>
      </div>
    </div>
  );
}

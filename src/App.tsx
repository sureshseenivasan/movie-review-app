// The React dependency is provided by the app's runtime; keep this file

import { useEffect, useMemo, useState } from "react";

import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";

import {
  getMovieDetails,
  getPopularMovies,
  searchMovies,
} from "./services/movieApi";


import type { Movie } from "./types/Movie";

function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  const [movies, setMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [userRating, setUserRating] = useState(0);

  // Load popular movies once, when the page first opens
  useEffect(() => {
    const loadPopular = async () => {
      try {
        setLoading(true);

        setError("");

        const results = await getPopularMovies();

        setMovies(results);
      } catch (err) {
        console.error("Failed to load popular movies:", err);

        setError(
          "Could not load movies. Check your API key and internet connection."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPopular();
  }, []);

  // Re-search the API whenever the search text changes, with a short
  // debounce so it doesn't fire a request on every keystroke
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        setError("");

        const results = search.trim()
          ? await searchMovies(search)
          : await getPopularMovies();

        setMovies(results);
      } catch (err) {
        console.error("Failed to search movies:", err);

        setError("Could not search movies. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Genre/year/rating filters apply on top of whatever the API returned
  const filteredMovies = useMemo(() => {
    return movies.filter(function (movie) {
      const matchesGenre = genre === "" || movie.genre.includes(genre);

      const matchesYear = year === "" || movie.year.toString() === year;

      const matchesRating = rating === "" || movie.rating >= Number(rating);

      return matchesGenre && matchesYear && matchesRating;
    });
  }, [movies, genre, year, rating]);

  const handleRating = (newRating: number) => {
    if (!selectedMovie) return;

    setUserRating(newRating);

    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === selectedMovie.id
          ? { ...movie, rating: newRating }
          : movie
      )
    );

    setSelectedMovie((current) =>
      current ? { ...current, rating: newRating } : null
    );
  };

  // Fetch full details (cast, director, duration) when a card is clicked
  const handleSelectMovie = async (movie: Movie) => {
    setSelectedMovie(movie);

    setUserRating(movie.rating);

    try {
      const fullDetails = await getMovieDetails(movie.id);

      setSelectedMovie(fullDetails);
    } catch (err) {
      console.error("Failed to load movie details:", err);
      // Keep showing the summary data already fetched
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-linear-to-r from-gray-950 via-gray-900 to-gray-800 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Movie Review
              </h1>

              <p className="mt-2 text-sm text-gray-300 sm:text-base">
                Discover movies, explore details and rate your favourites
              </p>
            </div>

            <div className="rounded-full bg-white/10 px-8 py-4 text-2xl backdrop-blur flex items-center justify-center font-semibold text-white sm:text-3xl">
              Movie Collection
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-1000px px-4 py-10 sm:px-6 lg:px-8 xl:px-10">
        {/* Find a Movie */}
        <section className="mb-12 rounded-3xl bg-white p-6 shadow-lg sm:p-8 lg:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Find a Movie
            </h2>

            <p className="mt-2 text-base text-gray-500">
              Search by movie title or use the filters below
            </p>
          </div>

          <div className="mb-8">
            <label className="mb-3 block text-base font-semibold text-gray-700">
              Search Movies
            </label>

            <SearchBar search={search} setSearch={setSearch} />
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-gray-700">
              Filter Movies
            </h3>

            <FilterBar
              genre={genre}
              setGenre={setGenre}
              year={year}
              setYear={setYear}
              rating={rating}
              setRating={setRating}
            />
          </div>
        </section>

        {/* Movie heading */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Movies
            </h2>

            <p className="mt-2 text-base text-gray-500">
              Browse our movie collection
            </p>
          </div>

          <span className="w-fit rounded-full bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700">
            {filteredMovies.length} movies
          </span>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow">
            <p className="text-lg font-semibold text-gray-600">
              Loading movies...
            </p>
          </div>
        ) : (
          <MovieList movies={filteredMovies} onSelectMovie={handleSelectMovie} />
        )}
      </main>

      {/* Details Modal */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          userRating={userRating}
          setUserRating={handleRating}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;

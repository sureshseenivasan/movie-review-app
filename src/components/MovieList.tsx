import MovieCard from "./MovieCard";
import type { Movie } from "../types/Movie";

interface Props {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

const MovieList = ({ movies, onSelectMovie }: Props) => {
  if (movies.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow">
        <h2 className="text-2xl font-bold">No movies found</h2>

        <p className="mt-2 text-gray-500">
          Try another title or adjust your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onSelectMovie(movie)}
        />
      ))}
    </div>
  );
};

export default MovieList;

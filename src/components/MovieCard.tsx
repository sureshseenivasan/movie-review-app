import type { Movie } from "../types/Movie";


interface Props {
  movie: Movie;
  onClick: () => void;
}

const MovieCard = ({ movie, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white text-left shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-200">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/no-poster.jpg";
          }}
        />

        <div className="absolute right-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-xs font-bold text-yellow-400">
          ★ {movie.rating > 0 ? movie.rating.toFixed(1) : "N/A"}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="truncate text-base font-bold text-gray-900">
          {movie.title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {movie.year || "Unknown year"}
        </p>

        <p className="mt-2 truncate text-sm text-gray-600">
          {movie.genre}
        </p>
      </div>
    </button>
  );
};

export default MovieCard;

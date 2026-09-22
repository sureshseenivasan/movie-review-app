import { useEffect } from "react";
import type { Movie } from "../types/Movie";
import StarRating from "./StarRating";

interface Props {
  movie: Movie;
  userRating: number;
  setUserRating: (value: number) => void;
  onClose: () => void;
}

const MovieDetails = ({ movie, userRating, setUserRating, onClose }: Props) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:p-8">
          <img
            src={movie.poster}
            alt={movie.title}
            className="mx-auto h-72 w-48 shrink-0 rounded-xl object-cover shadow-lg sm:mx-0"
            onError={(e) => {
              e.currentTarget.src = "/no-poster.jpg";
            }}
          />

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {movie.title}
              </h2>

              <button
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-full p-2 text-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-500">
              {movie.year > 0 && <span>{movie.year}</span>}

              {movie.duration && <span>• {movie.duration}</span>}

              {movie.genre && <span>• {movie.genre}</span>}
            </div>

            {movie.director && (
              <p className="mt-3 text-sm text-gray-600">
                <span className="font-semibold text-gray-800">Director:</span>{" "}
                {movie.director}
              </p>
            )}

            <p className="mt-4 leading-7 text-gray-700">
              {movie.description}
            </p>

            {movie.cast.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800">Cast</h3>

                <p className="mt-1 text-sm text-gray-600">
                  {movie.cast.join(", ")}
                </p>
              </div>
            )}

            <div className="mt-6 border-t pt-5">
              <h3 className="text-sm font-semibold text-gray-800">
                Your Rating
              </h3>

              <div className="mt-2">
                <StarRating
                  rating={userRating}
                  onRate={setUserRating}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

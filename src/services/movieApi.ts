import type { Movie } from "../types/Movie";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

// Must be the TMDB "API Read Access Token (v4 auth)" -- the long token
// starting with "eyJ...", NOT the short "API Key (v3 auth)".
// Set VITE_TMDB_TOKEN in your .env file.
const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string | undefined;

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
  genre_ids: number[];
}

interface TMDBResponse {
  results: TMDBMovie[];
}

interface TMDBGenre {
  id: number;
  name: string;
}

interface TMDBGenresResponse {
  genres: TMDBGenre[];
}

interface TMDBMovieDetails {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
  runtime: number | null;
  genres: { id: number; name: string }[];
  credits?: {
    cast: { name: string }[];
    crew: { name: string; job: string }[];
  };
}

const formatDuration = (minutes: number | null): string => {
  if (!minutes) return "";

  const hours = Math.floor(minutes / 60);

  const remaining = minutes % 60;

  return `${hours}h ${remaining}m`;
};

// TMDB's rating is 0-10; this app displays a 0-5 star scale
const toFiveStars = (voteAverage: number | undefined): number =>
  Number(((voteAverage || 0) / 2).toFixed(1));

let genreCache: Record<number, string> | null = null;

const getGenres = async (): Promise<Record<number, string>> => {
  if (genreCache) return genreCache;

  const response = await fetch(`${BASE_URL}/genre/movie/list?language=en-US`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to load genres (status ${response.status})`);
  }

  const data: TMDBGenresResponse = await response.json();

  genreCache = data.genres.reduce(
    (result, genre) => {
      result[genre.id] = genre.name;
      return result;
    },
    {} as Record<number, string>
  );

  return genreCache;
};

const mapMovie = (movie: TMDBMovie, genres: Record<number, string>): Movie => {
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
      ? `${IMAGE_URL}${movie.poster_path}`
      : "/no-poster.jpg",
    year: movie.release_date
      ? Number(movie.release_date.substring(0, 4))
      : 0,
    genre:
      movie.genre_ids
        ?.map((id) => genres[id])
        .filter(Boolean)
        .join(", ") || "Unknown",
    description: movie.overview || "No description available.",
    cast: [],
    rating: toFiveStars(movie.vote_average),
    director: "",
    duration: "",
  };
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  const [movieResponse, genres] = await Promise.all([
    fetch(`${BASE_URL}/movie/popular?language=en-US&page=1`, { headers }),
    getGenres(),
  ]);

  if (!movieResponse.ok) {
    throw new Error(`Failed to load movies (status ${movieResponse.status})`);
  }

  const data: TMDBResponse = await movieResponse.json();

  return data.results.map((movie) => mapMovie(movie, genres));
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query.trim()) {
    return getPopularMovies();
  }

  const [movieResponse, genres] = await Promise.all([
    fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&language=en-US&page=1&include_adult=false`,
      { headers }
    ),
    getGenres(),
  ]);

  if (!movieResponse.ok) {
    throw new Error(`Failed to search movies (status ${movieResponse.status})`);
  }

  const data: TMDBResponse = await movieResponse.json();

  return data.results.map((movie) => mapMovie(movie, genres));
};

export const getMovieDetails = async (movieId: number): Promise<Movie> => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?append_to_response=credits&language=en-US`,
    { headers }
  );

  if (!response.ok) {
    throw new Error(`Failed to load movie details (status ${response.status})`);
  }

  const movie: TMDBMovieDetails = await response.json();

  const director =
    movie.credits?.crew?.find((person) => person.job === "Director")?.name ||
    "";

  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
      ? `${IMAGE_URL}${movie.poster_path}`
      : "/no-poster.jpg",
    year: movie.release_date
      ? Number(movie.release_date.substring(0, 4))
      : 0,
    genre: movie.genres?.map((genre) => genre.name).join(", ") || "Unknown",
    description: movie.overview || "No description available.",
    cast: movie.credits?.cast?.slice(0, 10).map((person) => person.name) || [],
    rating: toFiveStars(movie.vote_average),
    director,
    duration: formatDuration(movie.runtime),
  };
};

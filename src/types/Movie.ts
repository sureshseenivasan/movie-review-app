export interface Movie {
  id: number;
  title: string;
  poster: string;
  year: number;
  genre: string; // comma-separated, e.g. "Action, Thriller"
  description: string;
  cast: string[];
  rating: number; // 0-5 (average / user rating)
  director: string;
  duration: string;
}

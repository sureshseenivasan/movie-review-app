interface Props {
  genre: string;
  setGenre: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  rating: string;
  setRating: (value: string) => void;
}

const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "War",
];

const currentYear = new Date().getFullYear();

const YEARS = Array.from({ length: 40 }, (_, i) => currentYear - i);

const selectClass =
  "rounded-xl border border-gray-300 bg-white px-4 py-3 text-base outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200";

const FilterBar = ({
  genre,
  setGenre,
  year,
  setYear,
  rating,
  setRating,
}: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className={selectClass}
        aria-label="Filter by genre"
      >
        <option value="">All Genres</option>

        {GENRES.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className={selectClass}
        aria-label="Filter by year"
      >
        <option value="">All Years</option>

        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className={selectClass}
        aria-label="Filter by minimum rating"
      >
        <option value="">Any Rating</option>

        <option value="4">4+ Stars</option>

        <option value="3">3+ Stars</option>

        <option value="2">2+ Stars</option>

        <option value="1">1+ Stars</option>
      </select>
    </div>
  );
};

export default FilterBar;

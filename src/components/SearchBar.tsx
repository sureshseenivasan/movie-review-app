interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar = ({ search, setSearch }: Props) => {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search movies by title..."
        className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-base outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
      />
    </div>
  );
};

export default SearchBar;

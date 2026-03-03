import { useEffect, useMemo, type ChangeEvent } from "react";
import debounce from "lodash.debounce";
import { SearchIcon } from "../icons/Search";

type SearchBarProps = {
  value: string;
  onSearch: (searchText: string) => void;
};

const SearchBar = (searchBarProps: SearchBarProps) => {
  const { value, onSearch } = searchBarProps;

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 500),
    [onSearch],
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  return (
    <div className="relative w-full max-w-md">
      <SearchIcon
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        className="w-full border border-gray-300 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition           
        focus:border-gray-500
        focus:ring
          focus:ring-gray-200"
        value={value}
        onChange={handleChange}
        placeholder="Search Products"
      />
    </div>
  );
};

export default SearchBar;

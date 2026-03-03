import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import debounce from "lodash.debounce";
import { SearchIcon } from "../icons/Search";

type SearchBarProps = {
  value: string;
  onSearch: (searchText: string) => void;
};

const SearchBar = ({ value, onSearch }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(value);

  // Sync if parent resets search
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const debouncedSearch = useMemo(
    () =>
      debounce((searchText: string) => {
        onSearch(searchText);
      }, 500),
    [onSearch],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // update UI immediately
    setInputValue(newValue);

    // debounce parent update
    debouncedSearch(newValue);
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
        value={inputValue}
        onChange={handleChange}
        placeholder="Search Products"
      />
    </div>
  );
};

export default SearchBar;

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import debounce from "lodash.debounce";
import { SearchIcon } from "../../icons/Search";
import { XIcon } from "../../icons/Cancel";

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
    <div className="relative w-full max-w-md" role="search">
      <SearchIcon
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />
      {value.length > 0 && (
        <XIcon
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:cursor-pointer"
          size={20}
          onClick={() => onSearch("")}
        />
      )}
      <input
        className="w-full border border-gray-300 dark:border-gray-600 
        rounded-xl py-2 sm:py-2.5 pl-8 pr-6 sm:pl-10 sm:pr-8 text-sm outline-none transition
        focus:border-gray-500 dark:focus:border-blue-400 focus:ring
        focus:ring-gray-200 dark:focus:ring-blue-400 text-black dark:text-gray-200"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search Products"
        aria-label="Search products"
      />
    </div>
  );
};

export default SearchBar;

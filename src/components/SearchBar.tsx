import { useEffect, useMemo, type ChangeEvent } from "react";
import debounce from "lodash.debounce";

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
    <div>
      <input
        className="border"
        value={value}
        onChange={handleChange}
        placeholder="Search Products"
      />
    </div>
  );
};

export default SearchBar;

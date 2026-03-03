import { HeartIcon } from "../icons/Heart";
import { MoonIcon } from "../icons/Moon";
import SearchBar from "./SearchBar";
import Title from "./Title";

interface NavbarProps {
  value: string;
  onSearch: (value: string) => void;
}

const Navbar = ({ onSearch, value }: NavbarProps) => {
  return (
    <div className="py-5 flex justify-between items-center">
      <Title title="Productly" />
      <div className="flex gap-4 items-center">
        <SearchBar value={value} onSearch={onSearch} />
        <MoonIcon
          className="bg-gray-200 hover:bg-gray-300 rounded-xl p-2.5 cursor-pointer"
          size={20}
        />
        <div className="bg-red-200 flex gap-1 p-2 rounded-xl items-center">
          <HeartIcon className="text-red-500" size={20} />
          <p className="text-red-900">0</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

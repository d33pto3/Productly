import Button from "./Button";

type CategoryFilterButtonProps = {
  selectedCategory: string;
  categoryName: string;
  handleClick: (category: string) => void;
};

const CategoryFilterButton = ({
  selectedCategory,
  categoryName,
  handleClick,
}: CategoryFilterButtonProps) => {
  return (
    <Button
      title={categoryName}
      handleClick={handleClick}
      isDisabled={selectedCategory === categoryName}
      className={`${selectedCategory === "All" ? "bg-gray-300 px-2 rounded-xl border border-gray-400" : "text-gray-500 hover:text-gray-900 cursor-pointer"} py-0.5 font-medium`}
    />
  );
};

export default CategoryFilterButton;

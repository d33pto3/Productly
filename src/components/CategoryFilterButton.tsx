import Button from "./Button";

type CategoryFilterButtonProps = {
  selectedCategory: string;
  value: string;
  onClick: (category: string) => void;
  title?: string;
};

const CategoryFilterButton = ({
  selectedCategory,
  onClick,
  value,
  title,
}: CategoryFilterButtonProps) => {
  return (
    <Button
      title={title || value}
      onClick={() => onClick(value)}
      isDisabled={selectedCategory === value}
      className={`${selectedCategory === value ? "bg-gray-300 px-2 sm:px-3 rounded-xl border border-gray-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer"} text-[12px] sm:text-sm py-0.5 font-medium`}
    />
  );
};

export default CategoryFilterButton;

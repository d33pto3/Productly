import { useCallback } from "react";
import CategoryFilterButton from "./CategoryFilterButton";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const CategoryFilter = (categoryFilterProps: CategoryFilterProps) => {
  const { categories, selectedCategory, onCategoryChange } =
    categoryFilterProps;

  const handleClick = useCallback(
    (category: string) => {
      onCategoryChange(category);
    },
    [onCategoryChange],
  );

  return (
    <div className="font-space px-[10%] flex gap-4 scroll-auto py-3 sm:py-5 bg-white dark:bg-gray-800">
      <div className="flex gap-4 overflow-x-auto whitespace-nowrap no-scrollbar">
        <CategoryFilterButton
          value="All"
          onClick={handleClick}
          selectedCategory={selectedCategory}
          key="All"
          title="All products"
        />
        {categories.map((category) => (
          <CategoryFilterButton
            value={category}
            onClick={handleClick}
            selectedCategory={selectedCategory}
            key={category}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

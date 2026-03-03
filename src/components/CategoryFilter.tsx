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

  console.log(selectedCategory);

  return (
    <div className="px-[10%] flex gap-4 scroll-auto my-5">
      <div className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
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

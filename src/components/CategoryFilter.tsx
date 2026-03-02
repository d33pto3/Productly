import type { ChangeEvent } from "react";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const CategoryFilter = (categoryFilterProps: CategoryFilterProps) => {
  const { categories, selectedCategory, onCategoryChange } =
    categoryFilterProps;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value);
  };
  return (
    <div>
      <select
        value={selectedCategory}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="All">All</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;

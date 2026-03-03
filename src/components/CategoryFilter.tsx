type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const CategoryFilter = (categoryFilterProps: CategoryFilterProps) => {
  const { categories, selectedCategory, onCategoryChange } =
    categoryFilterProps;

  const handleClick = (category: string) => {
    onCategoryChange(category);
  };

  console.log(selectedCategory);

  return (
    <div className="flex gap-4 scroll-auto my-5">
      <button
        className={`${selectedCategory === "All" ? "bg-gray-300 px-2 rounded-xl border border-gray-400" : "text-gray-500 hover:text-gray-900 cursor-pointer"} py-0.5 font-medium`}
        onClick={() => {
          handleClick("All");
        }}
        key="All"
        disabled={selectedCategory === "All"}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          className={`${selectedCategory === category ? "bg-gray-300 px-2 rounded-xl border border-gray-400" : "text-gray-500 hover:text-gray-900 cursor-pointer"} py-0.5 font-medium`}
          key={category}
          onClick={() => {
            handleClick(category);
          }}
          disabled={selectedCategory === "All"}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

import { motion } from "motion/react";

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
  const isSelected = selectedCategory === value;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(value)}
      className={`relative px-3 py-1 text-sm font-medium transition-colors duration-200 focus:outline-none ${isSelected
        ? "text-blue-600 dark:text-blue-400"
        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
      title={title || value}
    >
      <span className="relative z-10">{title || value}</span>
      {isSelected && (
        <motion.div
          layoutId="active-category"
          className="absolute inset-0 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
    </motion.button>
  );
};

export default CategoryFilterButton;

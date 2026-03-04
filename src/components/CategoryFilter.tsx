import { useCallback, useRef, useState } from "react";
import CategoryFilterButton from "./CategoryFilterButton";
import { motion, type Variants } from "motion/react";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const CategoryFilter = (categoryFilterProps: CategoryFilterProps) => {
  const { categories, selectedCategory, onCategoryChange } =
    categoryFilterProps;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  const handleClick = useCallback(
    (category: string) => {
      if (!dragged) {
        onCategoryChange(category);
      }
    },
    [onCategoryChange, dragged],
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setDragged(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="font-space px-[10%] flex gap-4 scroll-auto py-3 sm:py-5 bg-white dark:bg-gray-800"
    >
      <div
        ref={scrollRef}
        className="flex gap-2 sm:gap-4 overflow-x-auto whitespace-nowrap no-scrollbar cursor-grab active:cursor-grabbing select-none py-1"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <motion.div variants={itemVariants}>
          <CategoryFilterButton
            value="All"
            onClick={handleClick}
            selectedCategory={selectedCategory}
            key="All"
            title="All products"
          />
        </motion.div>
        {categories.map((category) => (
          <motion.div variants={itemVariants} key={category}>
            <CategoryFilterButton
              value={category}
              onClick={handleClick}
              selectedCategory={selectedCategory}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryFilter;

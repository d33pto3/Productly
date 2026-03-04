import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/product";
import ReactPaginate from "react-paginate";
import { ProductCard } from "./ProductCard";
import { useFavorites } from "../context/useFavorites";
import { motion, AnimatePresence, type Variants } from "motion/react";

type ProductListProps = {
  products: Product[];
};

const FAVORITES_KEY = "product-favorites";
const ITEMS_PER_PAGE = 20;

const ProductList = ({ products }: ProductListProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { favorites, toggleFavorite } = useFavorites();

  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    [],
  );

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.02 : 0.05,
      },
    },
  };

  const pageCount = Math.ceil(products.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  return (
    <div className="font-space px-[10%] min-h-screen py-8 bg-white dark:bg-black">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Showing{" "}
          <span className="text-gray-900 dark:text-white">
            {currentItems.length}
          </span>{" "}
          {currentItems.length === 1 ? "product" : "products"}
        </p>
      </div>

      <motion.div
        layout
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {currentItems.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isFavorite={favorites.has(product.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {pageCount > 1 && (
        <div className="flex justify-center sm:justify-end mt-12 pb-8">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            previousLabel="Prev"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            forcePage={currentPage}
            containerClassName="flex gap-2 items-center list-none"
            pageClassName="rounded-xl overflow-hidden transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 hover:cursor-pointer"
            pageLinkClassName="block px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            activeClassName="!bg-blue-600 !border-blue-600"
            activeLinkClassName="!text-white"
            previousClassName="flex items-center justify-center px-4 py-2 border border-blue-600 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer text-blue-600 font-bold"
            nextClassName="flex items-center justify-center px-4 py-2 border border-blue-600 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer text-blue-600 font-bold"
            disabledClassName="opacity-30 dark:opacity-70 cursor-not-allowed grayscale pointer-events-none"
            breakClassName="px-2 text-gray-400"
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;

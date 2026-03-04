import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/product";
import ReactPaginate from "react-paginate";
import { ProductCard } from "./ProductCard";
import { useFavorites } from "../context/useFavorites";

type ProductListProps = {
  products: Product[];
};

const FAVORITES_KEY = "product-favorites";
const ITEMS_PER_PAGE = 20;

const ProductList = ({ products }: ProductListProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { favorites, toggleFavorite } = useFavorites();

  const pageCount = Math.ceil(products.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  return (
    <div className="px-[10%] h-screen py-8 bg-white dark:bg-black">
      <p className="mb-4 text-gray-600 dark:text-gray-200">
        Showing {currentItems.length}{" "}
        {currentItems.length === 1 ? "product" : "products"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.has(product.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {pageCount > 0 && (
        <div className="flex justify-end mt-8">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            forcePage={currentPage}
            containerClassName="flex gap-2 items-center list-none"
            pageClassName="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hover:cursor-pointer"
            pageLinkClassName="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            activeClassName="!bg-blue-600 !border-blue-600"
            activeLinkClassName="!text-white"
            previousClassName="flex items-center justify-center w-10 h-10 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer text-gray-700 dark:text-gray-300"
            nextClassName="flex items-center justify-center w-10 h-10 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer text-gray-700 dark:text-gray-300"
            disabledClassName="opacity-30 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent"
            breakClassName="px-2 text-gray-500"
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;

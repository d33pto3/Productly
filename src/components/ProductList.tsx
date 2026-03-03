import { useMemo, useState } from "react";
import type { Product } from "../types/product";
import ReactPaginate from "react-paginate";
import { ProductCard } from "./ProductCard";

type ProductListProps = {
  products: Product[];
};

const FAVORITES_KEY = "product-favorites";
const ITEMS_PER_PAGE = 20;

const ProductList = ({ products }: ProductListProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        return new Set(parsedFavorites);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    }
    return new Set();
  });

  const pageCount = Math.ceil(products.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      // Persist to localStorage
      localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(Array.from(newFavorites)),
      );
      return newFavorites;
    });
  };

  return (
    <div className="px-[10%] py-8">
      <p className="mb-4">
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
            containerClassName="pagination"
            activeClassName="active"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="prev-button"
            nextClassName="next-button"
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;

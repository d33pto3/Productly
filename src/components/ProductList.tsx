import { useMemo, useState } from "react";
import type { Product } from "../types/product";
import ReactPaginate from "react-paginate";

type ProductListProps = {
  products: Product[];
};

const ITEMS_PER_PAGE = 20;

const ProductList = ({ products }: ProductListProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(products.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <div>
      <p>Showing {currentItems.length} products</p>
      {currentItems.map((curr) => (
        <p key={curr.id}>{curr.title}</p>
      ))}

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        forcePage={currentPage}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default ProductList;

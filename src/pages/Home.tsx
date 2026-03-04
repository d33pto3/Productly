import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/product";
import ProductList from "../components/ProductList";
import CategoryFilter from "../components/CategoryFilter";
import Loading from "../components/Loading";
import { useOutletContext } from "react-router";
import EmptyState from "../components/EmptyState";

interface LayoutContext {
  searchText: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { searchText } = useOutletContext<LayoutContext>();

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("data/product.json");

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while loading products.",
        );
      } finally {
        setLoading(false);
      }
    };

    getProductData();
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchText, selectedCategory]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <EmptyState title="Error Loading Products" message={error} icon="error" />
    );
  }

  return (
    <div className="min-h-[80vh]">
      <h1 className="sr-only">Premium Product Catalog - Productly</h1>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <hr className="text-gray-300 dark:text-gray-600" />
      <ProductList key={products.length} products={filteredProducts} />
    </div>
  );
};

export default Home;

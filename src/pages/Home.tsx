import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/product";
import ProductList from "../components/ProductList";
import CategoryFilter from "../components/CategoryFilter";
import { useOutletContext } from "react-router";

interface LayoutContext {
  searchText: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { searchText } = useOutletContext<LayoutContext>();

  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await fetch("data/product.json");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
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

  return (
    <div>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <hr className="text-gray-300 dark:text-gray-600" />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Home;

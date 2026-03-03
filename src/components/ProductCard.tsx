import { HeartIcon } from "../icons/Heart";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300`}
    >
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <HeartIcon
          onClick={() => onToggleFavorite(product.id)}
          className={`w-9 h-9 absolute top-2 right-2 p-2 bg-white dark:bg-gray-300 rounded-full shadow-md transition-transform duration-200 hover:cursor-pointer ${
            isFavorite
              ? "fill-red-500 text-red-500"
              : "text-gray-400 dark:text-gray-500"
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          size={22}
        />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
            {product.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {product.title}
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

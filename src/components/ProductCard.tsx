import { motion, AnimatePresence, type Variants } from "motion/react";
import { HeartIcon } from "../icons/Heart";
import type { Product } from "../types/product";
import { useState } from "react";
import ProductSkeleton from "./ProductSkeleton";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = (id: string) => {
    onToggleFavorite(id);
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={isLoaded ? { y: -8, transition: { duration: 0.2 } } : {}}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full relative"
    >
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="skeleton-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-20"
          >
            <ProductSkeleton />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`flex flex-col h-full transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="relative overflow-hidden group">
          <motion.img
            layout
            src={product.imageUrl}
            alt={product.title}
            onLoad={() => setIsLoaded(true)}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
          <HeartIcon
            onClick={() => handleClick(product.id)}
            className={`w-10 h-10 absolute top-3 right-3 p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 hover:cursor-pointer z-10 ${isFavorite
              ? "fill-red-500 text-red-500"
              : "text-gray-400 dark:text-gray-500 hover:text-red-400"
              }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            size={20}
          />
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="mb-3">
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-lg">
                {product.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
              {product.title}
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

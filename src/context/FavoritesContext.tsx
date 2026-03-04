import { createContext, useState, type ReactNode } from "react";

export interface FavoriteContextProps {
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  favoriteCount: number;
}

const FavoritesContext = createContext<FavoriteContextProps | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const storedFavorites = localStorage.getItem("product-favorites");

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

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const favoriteCount = favorites.size;

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, favoriteCount }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;

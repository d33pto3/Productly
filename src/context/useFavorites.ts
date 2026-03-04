import { useContext } from "react";
import FavoritesContext, {
  type FavoriteContextProps,
} from "./FavoritesContext";

export const useFavorites = (): FavoriteContextProps => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be within FavoritesProvider");
  return context;
};

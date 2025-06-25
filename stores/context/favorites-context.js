import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

export default function FavoritesContextProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);

  function handleAddFavorite(id) {
    setFavoriteIds((prevFavoriteIds) => [...prevFavoriteIds, id]);
  }

  function handleRemoveFavorite(id) {
    setFavoriteIds((prevFavoriteIds) =>
      prevFavoriteIds.filter((favoriteId) => favoriteId !== id)
    );
  }

  const providerValue = {
    ids: favoriteIds,
    addFavorite: handleAddFavorite,
    removeFavorite: handleRemoveFavorite,
  };
  return (
    <FavoritesContext.Provider value={providerValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

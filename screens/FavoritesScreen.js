import { useContext } from "react";
import { FavoritesContext } from "../stores/context/favorites-context";
import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function FavoritesScreen() {
  // const favoriteMealsCtx = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favorites.ids);
  const favoriteMeals = MEALS.filter(
    (meal) => favoriteMealIds.includes(meal.id)
    // favoriteMealsCtx.ids.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeals} />;
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  Button,
} from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../stores/redux/favorites";
// import { FavoritesContext } from "../stores/context/favorites-context";

export default function MealDetailScreen({ route, navigation }) {
  // const favoriteMealsCtx = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favorites.ids);
  const dispatch = useDispatch();
  const mealId = route.params.mealId;
  const meal = MEALS.find((meal) => meal.id === mealId);
  // const isFavorite = favoriteMealsCtx.ids?.includes(mealId);
  const isFavorite = favoriteMealIds.includes(mealId);

  function changeFavoriteStatusHandler() {
    if (isFavorite) {
      // favoriteMealsCtx.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
    } else {
      // favoriteMealsCtx.addFavorite(mealId);
      dispatch(addFavorite({ id: mealId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: meal.title,
      headerRight: () => {
        return (
          <IconButton
            icon={isFavorite ? "star" : "star-outline"}
            color="white"
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{meal.title}</Text>
      <View>
        <MealDetails
          duration={meal.duration}
          complexity={meal.complexity}
          affordability={meal.affordability}
          textStyle={styles.detailText}
        />
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Ingredients</Text>
      </View>
      {meal.ingredients.map((ingredient) => {
        return (
          <View key={ingredient} style={styles.listItem}>
            <Text style={styles.listItemText}>{ingredient}</Text>
          </View>
        );
      })}
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Steps</Text>
      </View>
      {meal.steps.map((step) => {
        return (
          <View key={step} style={styles.listItem}>
            <Text style={styles.listItemText}>{step}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  subtitleContainer: {
    borderBottomColor: "#e2b496",
    borderBottomWidth: 2,
    marginHorizontal: 24,
    marginVertical: 4,
    padding: 6,
  },
  subtitle: {
    color: "#e2b496",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  listItem: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 24,
    borderRadius: 6,
    backgroundColor: "#e2b496",
  },
  listItemText: {
    color: "#351401",
    textAlign: "center",
  },
});

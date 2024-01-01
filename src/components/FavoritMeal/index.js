// MealComponent.js (Where the user can mark a meal as favorite)
import React from "react";
import { useDispatch } from "react-redux";
import {
  addFavoriteMeal,
  removeFavoriteMeal,
} from "../redux/favoriteMealsSlice";

const MealComponent = ({ mealId, isFavorite }) => {
  const dispatch = useDispatch();

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavoriteMeal(mealId)); // Dispatch action to remove from favorites
    } else {
      dispatch(addFavoriteMeal(mealId)); // Dispatch action to add to favorites
    }
  };

  return (
    <div>
      {/* Display meal details */}
      <button onClick={handleFavoriteToggle}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default MealComponent;

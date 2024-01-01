import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  addToFavoritesAPI,
  removeFromFavoritesAPI,
} from "../../api/apiFavoriteRecepi";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/features/favoriteMealsSlice";
const ProductCard = ({ item }) => {
  const clampStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 3, // Number of lines to show
    lineHeight: "1.5em", // Line height
    maxHeight: "4.5em", // Total height = line height * number of lines
  };
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const favoriteMeals = useSelector(
    (state) => state.favoriteMeals.favoriteMeals
  );

  useEffect(() => {
    setIsFavorite(
      Array.isArray(favoriteMeals) && favoriteMeals.includes(item.idMeal)
    );
  }, [favoriteMeals, item.idMeal]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(item.idMeal));
    } else {
      dispatch(addToFavorites(item.idMeal));
    }
  };

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={item.strMealThumb}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.strMeal}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={clampStyle}>
            {item.strInstructions.substring(0, 200)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button component={Link} to={`/meal/${item.idMeal}`} size="small">
            Learn More
          </Button>
          <Button onClick={handleFavoriteToggle} size="small">
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;

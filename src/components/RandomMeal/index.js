import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomMealAction } from "../../redux/features/randomMealSlice";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./style";

const RandomMeal = () => {
  const dispatch = useDispatch();
  const { randomMeal, status, error } = useSelector(
    (state) => state.randomMeals
  );

  const generateRecipe = () => {
    dispatch(fetchRandomMealAction());
  };

  useEffect(() => {
    generateRecipe();
  }, []);

  return (
    <Box>
      <Typography variant="h2"> Featured Recipe</Typography>

      <Box sx={styles.randomContainer}>
        <Box sx={styles.innerContainer}>
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p>Error: {error}</p>}
          {status === "succeeded" && randomMeal && (
            <>
              <Box sx={styles.imageContainer}>
                <img
                  style={styles.randomMealImage}
                  src={randomMeal.strMealThumb}
                  alt={randomMeal.strMeal}
                />
              </Box>
              <Box sx={styles.randomMeal}>
                <h2>{randomMeal.strMeal}</h2>
                <Typography variant="body">
                  {randomMeal.strInstructions.substring(0, 1000)}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Typography
        component={Link}
        to="#"
        onClick={generateRecipe}
        textAlign={"center"}
      >
        Generate Random Recipe
      </Typography>
    </Box>
  );
};

export default RandomMeal;

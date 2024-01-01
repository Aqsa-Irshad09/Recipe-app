import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomMealAction } from "../../redux/features/randomMealSlice";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { StyledBox, StyledInnerBox } from "./style";

const RandomMeal = () => {
  const theme = useTheme();

  const wrapperStyle = {
    ...theme.wrapper,
  };
  const dispatch = useDispatch();
  const { randomMeal, status, error } = useSelector(
    (state) => state.randomMeals
  );

  const generateRecipe = () => {
    dispatch(fetchRandomMealAction());
  };

  useEffect(() => {
    generateRecipe(); // Automatically generate a recipe when the component mounts
  }, []);

  return (
    <Container style={wrapperStyle} sx={{ py: 5 }}>
      <Typography variant="h2">Get A Random Recipe</Typography>
      <div>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" && randomMeal && (
          <StyledBox>
            <StyledInnerBox>
              <img
                src={randomMeal.strMealThumb}
                alt={randomMeal.strMeal}
                style={{ height: "300px", width: "100%", objectFit: "cover" }}
              />
            </StyledInnerBox>
            <styledLeftBox>
              {" "}
              <h2>{randomMeal.strMeal}</h2>
              <Typography variant="body">
                {randomMeal.strInstructions}
              </Typography>
            </styledLeftBox>
          </StyledBox>
        )}
      </div>
      <Typography
        component={Link}
        to="#"
        onClick={generateRecipe}
        textAlign={"center"}
      >
        Generate Random Recipe
      </Typography>
    </Container>
  );
};

export default RandomMeal;

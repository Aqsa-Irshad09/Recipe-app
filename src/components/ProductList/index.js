import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import ProductCard from "../ProductCard";
import { fetchMeals } from "../../redux/features/fetchMealSlice";

import { URL } from "../../constant";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const wrapperStyle = {
    ...theme.wrapper,
  };
  const dispatch = useDispatch();

  const mealList = useSelector((state) => state.meals.mealList);
  const status = useSelector((state) => state.meals.status);
  const error = useSelector((state) => state.meals.error);

  useEffect(() => {
    dispatch(fetchMeals("your_search_query_here")); // Dispatch fetchMeals action with a search query
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!mealList) {
    return null; // Or any placeholder while waiting for data
  }
  const seeMore = () => {
    navigate(URL.RECIPE);
  };
  return (
    <Container style={wrapperStyle}>
      <Typography variant="h2">Our Recipes</Typography>
      <Grid container spacing={2}>
        {mealList.slice(0, 6).map((item) => (
          <Grid key={item.idMeal} item xs={12} sm={6} md={4} lg={4}>
            <ProductCard item={item} />
          </Grid>
        ))}
      </Grid>
      <Button
        onClick={seeMore}
        variant="contained"
        sx={{ display: "flex", alignItems: "center", margin: "20px auto" }}
      >
        More Meals
      </Button>
    </Container>
  );
};

export default ProductList;

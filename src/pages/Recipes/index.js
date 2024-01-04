import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeals } from "../../redux/features/fetchMealSlice";
import Layout from "../../Layout";
import { useTheme } from "@emotion/react";

const Recipes = () => {
  const theme = useTheme();

  const wrapperStyle = {
    ...theme.wrapper,
  };
  const dispatch = useDispatch();

  const mealList = useSelector((state) => state.meals.mealList);
  const status = useSelector((state) => state.meals.status);
  const error = useSelector((state) => state.meals.error);

  useEffect(() => {
    dispatch(fetchMeals("your_search_query_here"));
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
  return (
    <Layout>
      <Container style={wrapperStyle} pl={0}>
        <Typography variant="h2">Our Recipe</Typography>
        <Grid container spacing={2} pb={4}>
          {mealList.map((item) => (
            <Grid key={item.idMeal} item xs={12} sm={6} md={4} lg={4}>
              <ProductCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Recipes;

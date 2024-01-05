import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchMealsForCategory } from "../../redux/features/selectedCategory";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import Layout from "../../Layout";
import styled from "@emotion/styled";

const CategoryDetail = () => {
  const StyledCardMedia = styled(CardMedia)({
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)", // Zoom effect on hover
    },
  });

  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.selectedCategory.meals);
  const status = useSelector((state) => state.selectedCategory.status);

  useEffect(() => {
    dispatch(fetchMealsForCategory(categoryName));
  }, [dispatch, categoryName]);

  if (status === "idle" || status === "loading") {
    return <p>Loading meals...</p>;
  }

  if (status === "failed") {
    return <p>Error: Failed to fetch meals</p>;
  }

  if (!meals || meals.length === 0) {
    return <p>No meals found</p>;
  }

  return (
    <>
      <Container>
        <Box sx={{}}>
          <Typography variant="h2">Category : {categoryName}</Typography>
        </Box>
        <Grid container spacing={2} width={"100%"}>
          {meals.map((item) => (
            <Grid item key={item} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardActionArea>
                  <StyledCardMedia
                    component="img"
                    height="200"
                    image={item.strMealThumb}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body" component="div">
                      {item.strMeal}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default CategoryDetail;

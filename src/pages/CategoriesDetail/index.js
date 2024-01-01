import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchMealsForCategory } from "../../redux/features/selectedCategory";
import ProductCard from "../../components/ProductCard";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const CategoryDetail = () => {
  const theme = useTheme();

  const wrapperStyle = {
    ...theme.wrapper,
  };
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.selectedCategory.meals);
  const status = useSelector((state) => state.selectedCategory.status);
  const clampStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 3, // Number of lines to show
    lineHeight: "1.5em", // Line height
    maxHeight: "4.5em", // Total height = line height * number of lines
  };
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
    <Container style={wrapperStyle}>
      <Typography variant="h2">{categoryName}</Typography>

      <Grid container spacing={2} width={"100%"}>
        {meals.map((item) => (
          <Grid item key={item} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardActionArea>
                <CardMedia
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
  );
};

export default CategoryDetail;

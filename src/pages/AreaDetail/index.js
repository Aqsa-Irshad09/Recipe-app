import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchRecipesByArea } from "../../redux/features/selectedRecipeByAreaSlice";
import { useTheme } from "@emotion/react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const AreaDetail = () => {
  const clampStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 3, // Number of lines to show
    lineHeight: "1.5em", // Line height
    maxHeight: "4.5em", // Total height = line height * number of lines
  };
  const theme = useTheme();

  const wrapperStyle = {
    ...theme.wrapper,
  };
  const { areaName } = useParams();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.selectedRecipeByArea.recipes);
  console.log("recipes", recipes);
  const status = useSelector((state) => state.selectedRecipeByArea.status);

  useEffect(() => {
    dispatch(fetchRecipesByArea(areaName));
  }, [dispatch, areaName]);

  if (status === "loading") {
    return <p>Loading recipes...</p>;
  }

  if (status === "failed") {
    return <p>Error: Failed to fetch recipes</p>;
  }

  if (!recipes || recipes.length === 0) {
    return <p>No recipes found for {areaName}</p>;
  }

  return (
    <Container style={wrapperStyle}>
      <Typography variant="h2">{areaName}</Typography>

      <Grid container spacing={2} width={"100%"}>
        {recipes.map((recipe) => (
          <Grid recipe key={recipe} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.strMealThumb}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="body" component="div">
                    {recipe.strMeal}
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

export default AreaDetail;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/features/categoriesSlice";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const Categories = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    categories,
    status: categoriesStatus,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <Box sx={{ p: 0 }}>
      {categoriesStatus === "loading" && <p>Loading categories...</p>}
      {categoriesStatus === "failed" && <p>Error: {categoriesError}</p>}
      <Typography variant="h2">Our Categories </Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item key={category.idCategory} xs={12} sm={6} md={4} lg={3}>
            <Card
              onClick={() => handleCategoryClick(category.strCategory)}
              sx={{
                "&:hover img": {
                  transform: "scale(1.1)", // Zoom effect on image hover
                  transition: "transform 0.3s ease-in-out", // Smooth transition
                },
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={category.strCategoryThumb}
                  alt={category.strCategory}
                />
                <CardContent sx={{ padding: "0" }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      position: "absolute",
                      top: "0%",
                      height: "100%",
                      width: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.2)", // Black background with 50% opacity
                      left: "0",
                      color: "white",
                      textAlign: "center",
                      padding: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",

                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255,.8)",
                        animationDuration: "auto",
                        color: "#5D3A17",
                      },
                    }}
                  >
                    {category.strCategory}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default Categories;

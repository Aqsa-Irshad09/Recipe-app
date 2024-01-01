import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/features/categoriesSlice";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { unstable_HistoryRouter, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const Categories = () => {
  const theme = useTheme();

  const wrapperStyle = {
    ...theme.wrapper,
  };
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
    <Container style={wrapperStyle} sx={{ p: 0 }}>
      {categoriesStatus === "loading" && <p>Loading categories...</p>}
      {categoriesStatus === "failed" && <p>Error: {categoriesError}</p>}
      <Typography variant="h2">Our Categories to Select</Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item key={category.idCategory} xs={12} sm={6} md={4} lg={3}>
            <Card onClick={() => handleCategoryClick(category.strCategory)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={category.strCategoryThumb}
                  alt={category.strCategory}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category.strCategory}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {category.strCategoryDescription.substring(0, 100)}
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
export default Categories;

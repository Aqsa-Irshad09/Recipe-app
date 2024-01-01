import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../Layout";

const DetailPage = () => {
  const { id } = useParams();
  const mealList = useSelector((state) => state.meals.mealList);
  const meal = mealList.find((item) => item.idMeal === id);

  if (!meal) {
    return <div>Meal not found!</div>; // Handle if the meal is not found
  }

  return (
    <Layout>
      <Container>
        <Typography variant="h3" py={2}>
          {meal.strMeal}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={meal.strMealThumb}
                alt={meal.strMeal}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Ingredients:</Typography>
            <ul>
              {Object.keys(meal)
                .filter((key) => key.startsWith("strIngredient") && meal[key])
                .map((ingredientKey, index) => (
                  <li style={{ padding: "10px 0px" }} key={index}>{`${
                    meal[ingredientKey]
                  } - ${meal[`strMeasure${index + 1}`]}`}</li>
                ))}
            </ul>
          </Grid>
          <Box sx={{ py: 2 }}>
            {" "}
            <Typography variant="h5">Instructions:</Typography>
            <Typography>{meal.strInstructions}</Typography>
            {meal.strYoutube && (
              <Button
                variant="contained"
                color="primary"
                href={meal.strYoutube}
                target="_blank"
              >
                Watch Recipe Video
              </Button>
            )}
          </Box>
        </Grid>
        <Typography variant="subtitle2">
          Source:{" "}
          <a href={meal.strSource} target="_blank" rel="noreferrer">
            {meal.strSource}
          </a>
        </Typography>
      </Container>
    </Layout>
  );
};

export default DetailPage;

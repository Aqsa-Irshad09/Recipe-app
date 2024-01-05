import { Typography, CardMedia, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../Layout";
import style from "./style";
import styled from "@emotion/styled";

const DetailPage = () => {
  const StyledCardMedia = styled(CardMedia)({
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  });

  const { id } = useParams();
  const mealList = useSelector((state) => state.meals.mealList);
  const meal = mealList.find((item) => item.idMeal === id);

  if (!meal) {
    return <div>Meal not found!</div>; // Handle if the meal is not found
  }
  // Function to add numbering to the instructions
  const addNumberingToInstructions = (instructions) => {
    const instructionsArray = instructions
      .split("\n")
      .filter((step) => step.trim().length > 0);
    const numberedInstructions = instructionsArray.map(
      (step, index) => `${index + 1}. ${step}`
    );
    return numberedInstructions.join("\n");
  };

  const numberedInstructions = addNumberingToInstructions(meal.strInstructions);
  return (
    <>
      <Box sx={style.cardImage}>
        <StyledCardMedia
          component="img"
          height="400"
          width={"100%"}
          image={meal.strMealThumb}
          alt={meal.strMeal}
          position="relative"
        />
        <Box sx={style.title}>
          <Typography variant="h3" py={2}>
            {meal.strMeal}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box width={"50%"} p={5} sx={{ backgroundColor: "#E2DCCD" }}>
          <Typography variant="h5">INGREDIENTS</Typography>
          <ul>
            {Object.keys(meal)
              .filter((key) => key.startsWith("strIngredient") && meal[key])
              .map((ingredientKey, index) => (
                <li style={{ padding: "10px 0px" }} key={index}>{`${
                  meal[ingredientKey]
                } - ${meal[`strMeasure${index + 1}`]}`}</li>
              ))}
          </ul>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
            <Typography variant="subtitle2">
              Source:{" "}
              <a href={meal.strSource} target="_blank" rel="noreferrer">
                {meal.strSource}
              </a>
            </Typography>
          </Box>
        </Box>
        <Box width={"50%"} p={10}>
          <Typography variant="h5">INSTRUCTIONS</Typography>
          <Typography>{numberedInstructions}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default DetailPage;

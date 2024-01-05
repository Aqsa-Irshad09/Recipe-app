import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePlannedMealAsync,
  fetchPlannedMealsAsync,
  updatePlannedMealAsync,
} from "../../redux/features/fetchPlannedMealsSlice";
import { BorderAll } from "@mui/icons-material";
import {
  Box,
  Button,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import styles from "./style";
import { formatDate } from "../../utils";
import { Link } from "react-router-dom";
import Layout from "../../Layout";

const PlannedRecipe = () => {
  const dispatch = useDispatch();
  const plannedMeals = useSelector(
    (state) => state.fetchingPlannedMeal.plannedMeals
  );
  const loading = useSelector((state) => state.fetchingPlannedMeal.loading);
  const error = useSelector((state) => state.fetchingPlannedMeal.error);

  useEffect(() => {
    dispatch(fetchPlannedMealsAsync());
  }, [dispatch]);

  const handleDeleteMeal = (idToDelete) => {
    dispatch(deletePlannedMealAsync(idToDelete));
  };

  const groupedMealsByDate = plannedMeals.reduce((grouped, meal) => {
    const key = `${meal.date}_${meal.day}`; // Create a unique key using date and day
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(meal);
    return grouped;
  }, {});

  return (
    <>
      <Box sx={{}}>
        <Typography variant="h2">Your Planned Meals</Typography>
      </Box>
      {Object.keys(groupedMealsByDate).length > 0 ? (
        <TableContainer component="Paper">
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#D2B48C", color: "#5D3A17" }}>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Day
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Meal Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Meal Type
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(groupedMealsByDate).map(([key, meals]) => {
                const [date, day] = key.split("_");
                return meals.map((meal, index) => (
                  <TableRow key={meal.id}>
                    {index === 0 && (
                      <>
                        <TableCell
                          rowSpan={meals.length}
                          sx={{ fontWeight: "bold" }}
                        >
                          {formatDate(meal.date)}
                        </TableCell>
                        <TableCell rowSpan={meals.length}>{day}</TableCell>
                      </>
                    )}
                    <TableCell
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {/* <Link to={`/meal/${meal.recipe.idMeal}`}> */}
                      {meal.recipe.strMeal}
                      <img
                        style={{ width: "80px", borderRadius: "50%" }}
                        src={meal.recipe.strMealThumb}
                        alt={meal.recipe.strMeal}
                      />
                      {/* </Link> */}
                    </TableCell>

                    <TableCell>{meal.type}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDeleteMeal(meal.id)}
                        sx={styles.deleteBtn}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ));
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No planned meals available</p>
      )}
    </>
  );
};

export default PlannedRecipe;

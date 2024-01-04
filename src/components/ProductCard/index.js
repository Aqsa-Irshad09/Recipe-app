import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import styles from "./style";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setSelectedRecipe } from "../../redux/features/plannedMealSlice";

import CustomCalendar from "../CustomCalendar";
import { addPlannedMealsAsync } from "../../redux/features/plannedMealSlice";
import styled from "@emotion/styled";
import { isAuthenticated } from "../../api/auth";
const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const clampStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 3,
    lineHeight: "1.5em",
    maxHeight: "4.5em",
  };
  const StyledCardMedia = styled(CardMedia)({
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)", // Zoom effect on hover
    },
  });
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [mealType, setMealType] = useState("");

  const dispatch = useDispatch();

  const handleMealTypeChange = (event) => {
    setMealType(event.target.value);
  };

  const handleCalendarToggle = () => {
    if (!isAuthenticated()) {
      navigate("/signin");
    } else {
      setShowCalendar(true);
      setShowDialog(true);
    }
  };

  const handleDateSelect = async (selectedDate, selectedDay) => {
    dispatch(
      setSelectedRecipe({
        recipe: item,
        day: selectedDay,
        date: selectedDate.toISOString(),
        type: mealType,
      })
    );

    try {
      await dispatch(
        addPlannedMealsAsync({
          recipe: item,
          day: selectedDay,
          date: selectedDate.toISOString(),
          type: mealType,
        })
      );
      setShowCalendar(false);
      setShowDialog(false);
    } catch (error) {
      // Handle any errors here (optional based on your use case)
      console.error("Error adding planned meal:", error);
    }
  };
  return (
    <Card>
      <CardActionArea>
        <StyledCardMedia
          component="img"
          height="200"
          image={item.strMealThumb}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.strMeal}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={clampStyle}>
            {item.strInstructions.substring(0, 200)}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            component={Link}
            to={`/meal/${item.idMeal}`}
            size="small"
            sx={styles.actionBtn}
          >
            Learn More
          </Button>

          <Button
            onClick={handleCalendarToggle}
            size="small"
            sx={styles.actionBtn}
          >
            Add to Calendar
          </Button>
          <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
            <DialogTitle textAlign={"center"}>
              {" "}
              Choose Meal Type and Date
            </DialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <DialogContentText sx={{ py: 2 }}>
                Choose the meal type for this recipe:
              </DialogContentText>
              <FormControl sx={{ width: "300px" }}>
                <InputLabel id="select-label">Select any type</InputLabel>
                <Select
                  labelId="select-label"
                  value={mealType}
                  onChange={handleMealTypeChange}
                  label="Select any type"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="breakfast">Breakfast</MenuItem>
                  <MenuItem value="lunch">Lunch</MenuItem>
                  <MenuItem value="dinner">Dinner</MenuItem>
                  {/* Add other options as needed */}
                </Select>
              </FormControl>
              <CustomCalendar onSelect={handleDateSelect} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowDialog(false)} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;

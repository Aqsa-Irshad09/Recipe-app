import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel/dist";
import theme from "../../theme";
import { Paper, Typography } from "@mui/material";
import ProductList from "../../components/ProductList";
import RandomMeal from "../../components/RandomMeal";
import { images } from "../../data";
import Layout from "../../Layout";
import Categories from "../../components/Categories";
import RecipeByArea from "../../components/RecipeByArea";
import Item from "../../components/Item";
import { useDispatch, useSelector } from "react-redux";
import fetchPlannedMealsSlice, {
  fetchPlannedMeals,
} from "../../redux/features/fetchPlannedMealsSlice";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <Carousel
        indicators={false}
        onChange={(index) => handleSlideChange(index)}
      >
        {images.map((item, i) => (
          <div key={i} style={{ position: "relative" }}>
            <Item
              item={item}
              height={theme.sliderImages.height}
              showLabel={currentIndex === i} // Show label conditionally
              label={item.label} // Pass your label here
            />
          </div>
        ))}
      </Carousel>

      <Categories />
      <RandomMeal />
      <RecipeByArea />
      <ProductList />
    </>
  );
};

export default Home;

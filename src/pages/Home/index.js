import React from "react";
import Carousel from "react-material-ui-carousel/dist";
import theme from "../../theme";
import { Paper } from "@mui/material";
import ProductList from "../../components/ProductList";
import RandomMeal from "../../components/RandomMeal";
import { images } from "../../data";
import Layout from "../../Layout";
import Categories from "../../components/Categories";
import RecipeByArea from "../../components/RecipeByArea";

const Home = () => {
  return (
    <Layout>
      <Carousel indicators={false}>
        {images.map((item, i) => (
          <Item key={i} item={item} height={theme.sliderImages.height} />
        ))}
      </Carousel>
      <Categories />
      <RandomMeal />
      <RecipeByArea />
      <ProductList />
    </Layout>
  );
};
function Item({ item, height }) {
  return (
    <>
      <Paper style={{ height: height }}>
        <img
          src={item.imgPath}
          alt={item.label}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Paper>
    </>
  );
}
export default Home;

const styles = {
  randomContainer: {
    color: "#FFFFFF",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    backgroundImage: `url('https://dtkudil.wpenginepowered.com/wp-content/uploads/2021/08/parallax-img-1.jpg?id=13906')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  randomMeal: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
    "@media (max-width: 800px)": {
      width: "100%",
    },
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    justifyContent: "center",
    "@media (max-width: 800px)": {
      flexDirection: "column",
    },
  },
  randomMealImage: {
    height: "300px",
    objectFit: "cover",
    borderRadius: "50%",
    "@media (max-width: 800px)": {
      borderRadius: "none",
      width: "100%",
    },
  },
};
export default styles;

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 375,
      sm: 600,
      md: 960,
      lg: 1024,
      xl: 1280,
    },
  },
  wrapper: {
    width: "95%",
    margin: "0 auto",
  },
  palette: {
    primary: {
      main: "#000", // Your primary color
    },
    secondary: {
      main: "#FEBE10", // Your secondary color
    },
    yellowColor: "#FEBE10",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "10px 0", // Adjust margin as needed
        },
      },
    },
  },
  typography: {
    h2: {
      fontSize: "3rem",
      color: "#5D3A17",
      padding: "10px 0px",
      margin: "40px 0px",
      fontSize: "30px",
      fontWeight: "bold",
      textAlign: "center",
      background: "#D2B48C",
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
      },
      "@media (min-width:960px)": {
        fontSize: "2.4rem",
      },
    },
    h6: {
      fontSize: "22px",
      marginBottom: "0px !important",
      color: "smokewhite",
      "@media (max-width:1024px)": {
        fontSize: "18px",
      },
      "@media (max-width:600px)": {
        fontSize: "14px",
      },
    },
    body1: {
      color: "#8D6E63",
      fontSize: "16px",
      "@media (max-width:1024px)": {
        fontSize: "14px",
      },
      "@media (max-width:600px)": {
        fontSize: "12px",
      },
    },
  },
  sliderImages: {
    height: "70vh",
    width: "100%",
    backgroundSize: "cover",
  },
  button: {
    backgroundColor: "#8D6E63",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#FFFFFF",
    },
  },
});

export default theme;

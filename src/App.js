import React from "react";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import MainRouter from "./routes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  );
};

export default App;

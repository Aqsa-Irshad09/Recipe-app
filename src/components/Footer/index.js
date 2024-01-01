import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { StyledBox, StyledContainer } from "./style";

const Footer = () => {
  return (
    <StyledBox>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        FeastFinder
      </Typography>
      <List sx={{ display: "flex", flexDirection: "row" }}>
        <ListItem button component={RouterLink} to={URL.HOME}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to={URL.ABOUT}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={RouterLink} to={URL.RECIPE}>
          <ListItemText primary="Recipes" />
        </ListItem>
      </List>
      <Typography variant="body" color={"primary"}>
        © 2023 Your Company Name. All Rights Reserved.
      </Typography>
    </StyledBox>
  );
};

export default Footer;

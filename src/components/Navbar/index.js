import React, { useState } from "react";
import { styled, useTheme } from "@mui/system";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import { URL } from "../../constant";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <List>
      <ListItem button component={RouterLink} to={URL.HOME}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={RouterLink} to={URL.ABOUT}>
        <ListItemText primary="About" />
      </ListItem>
      <ListItem button component={RouterLink} to={URL.RECIPE}>
        <ListItemText primary="Recipes" />
      </ListItem>

      {/* Add more menu items as needed */}
    </List>
  );

  const DrawerContainer = styled("div")({
    width: "250px",
  });

  const MenuButton = styled(IconButton)(({ theme }) => ({
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  }));

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <MenuButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </MenuButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FeastFinder
          </Typography>
          {isMobile ? null : (
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

              {/* Add more menu items as needed */}
            </List>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <DrawerContainer>{drawerContent}</DrawerContainer>
      </Drawer>
    </div>
  );
};

export default Navbar;

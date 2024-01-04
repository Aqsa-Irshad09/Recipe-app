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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { URL } from "../../constant";
import styles from "./style";
import { toast } from "react-toastify";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const isAuthenticated = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn === "true";
  };
  const handleLogout = () => {
    toast.success("logout completed");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  const drawerContent = (
    <List>
      {isAuthenticated() ? (
        <>
          <ListItem button component={RouterLink} to={URL.HOME}>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button component={RouterLink} to={URL.RECIPE}>
            <ListItemText primary="Recipes" />
          </ListItem>
          <ListItem button component={RouterLink} to={URL.PLANNED_RECIPE}>
            <ListItemText primary="Planned Meals" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      ) : (
        <>
          <ListItem button component={RouterLink} to={URL.HOME}>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button component={RouterLink} to={URL.RECIPE}>
            <ListItemText primary="Recipes" />
          </ListItem>
          <ListItem button component={RouterLink} to={URL.SIGNIN}>
            <ListItemText primary="Signin" />
          </ListItem>
        </>
      )}
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
      <AppBar position="sticky" sx={styles.navbar}>
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

              <ListItem button component={RouterLink} to={URL.RECIPE}>
                <ListItemText primary="Recipes" />
              </ListItem>
              {isAuthenticated() && (
                <>
                  <ListItem
                    button
                    component={RouterLink}
                    to={URL.PLANNED_RECIPE}
                  >
                    <ListItemText primary="Planned Meals" />
                  </ListItem>
                  <ListItem button onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </>
              )}
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

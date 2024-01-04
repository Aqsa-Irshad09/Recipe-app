import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./style";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { fetchAreas } from "../../redux/features/recipeByAreaSlice";
import { useTheme } from "@emotion/react";

const RecipeByArea = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const areas = useSelector((state) => state.recipeByArea.areas);
  const status = useSelector((state) => state.recipeByArea.status);

  useEffect(() => {
    dispatch(fetchAreas());
  }, [dispatch]);

  if (status === "idle" || status === "loading") {
    return <p>Loading areas...</p>;
  }

  if (status === "failed") {
    return <p>Error: Failed to fetch areas</p>;
  }

  if (!areas || areas.length === 0) {
    return <p>No areas found</p>;
  }

  return (
    <Box>
      <Typography variant="h2">Select By Area</Typography>
      <Grid container spacing={2}>
        {areas.map((area) => (
          <Grid item key={area.strArea} sm={6} md={4} lg={3}>
            <Link
              to={`/area/${area.strArea}`}
              style={{ textDecoration: "none" }}
            >
              <Card sx={styles.card}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      "&:hover": {
                        textAlign: "center",
                      },
                    }}
                  >
                    {area.strArea}
                  </Typography>
                </CardContent>
                <CardActionArea>
                  <Button textAlign="center" sx={styles.viewBtn}>
                    View
                  </Button>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecipeByArea;

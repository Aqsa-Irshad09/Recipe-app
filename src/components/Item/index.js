import { Paper, Typography } from "@mui/material";
import React from "react";

const Item = ({ item, height, showLabel, label }) => {
  return (
    <>
      <Paper sx={{ position: "relative", height: height }}>
        <img
          src={item.imgPath}
          alt={item.label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out", // Adding transition for smoother effect
            transform: showLabel ? "scale(1.1)" : "scale(1)", // Zoom effect on hover
          }}
        />
        {showLabel && (
          <Paper
            elevation={3}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "8px",
              textAlign: "center",
              fontSize: "20px",
              backgroundColor: "rgba(243,225,201,0.5)",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontSize: "40px", fontWeight: 600, color: "#5D3A17" }}
            >
              {label}
            </Typography>
          </Paper>
        )}
      </Paper>
    </>
  );
};
export default Item;

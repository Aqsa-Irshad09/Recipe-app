import { styled } from "@mui/system";
import { Typography, Button, Container, Box } from "@mui/material";

export const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
});
export const StyledInnerBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "50% !important",
});
export const styledLeftBox = styled(Box)({
  width: "50% !important",
});

export const StyledButton = styled(Button)({
  marginTop: "20px",
});

import { styled } from "@mui/system";
import { Typography, Button, Container } from "@mui/material";

export const StyledTypography = styled(Typography)({
  color: "blue",
});
export const StyledContainer = styled(Container)({
  width: "50%",
  "@media (max-width: 600px)": {
    width: "90%", // For small screens, change to column layout
  },
});

export const StyledButton = styled(Button)({
  marginTop: "20px",
});

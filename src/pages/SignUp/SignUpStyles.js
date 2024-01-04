import { styled } from "@mui/system";
import { Typography, Button, Container } from "@mui/material";

export const StyledTypography = styled(Typography)({
  color: "blue",
});
export const StyledContainer = styled(Container)({
  width: "50%",
  paddingBottom: "10px",
  "@media (max-width: 600px)": {
    width: "90%", // For small screens, change to column layout
  },
});

export const StyledButton = styled(Button)({
  marginTop: "20px",
  backgroundColor: "#855C33",
  border: "1px solid transparent",
  color: "white",
  "&:hover": {
    backgroundColor: "transparent",
    border: "1px solid #855C33",
    color: "#855C33",
  },
});

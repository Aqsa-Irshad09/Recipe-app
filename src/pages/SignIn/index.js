import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Typography, Box } from "@mui/material";
import { StyledContainer } from "./SignInStyles";
import { generateValidationSchema } from "../../validations";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/features/loginUserSlice";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../constant";
import LoginButton from "../../components/LoginButton";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fields = ["email", "password"];

  const validationSchema = generateValidationSchema(fields);

  const handleSubmit = async (values) => {
    const storedUserData = JSON.parse(localStorage.getItem("users")) || [];
    console.log("User data from local storage", storedUserData);
    try {
      // Dispatch login action if credentials are valid
      await dispatch(loginUser(values));

      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (isLoggedIn === "true") {
        navigate(URL.HOME);
      }
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };
  // Render a redirect conditionally based on loggedIn state
  const navigateToSignUp = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate("/signup");
  };

  return (
    <StyledContainer>
      <Typography variant="h2" component="h1" gutterBottom>
        Signin
      </Typography>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              label="Email"
              name="email"
              variant="outlined"
              error={errors.email && touched.email}
              helperText={errors.email && touched.email ? errors.email : ""}
              required
              fullWidth
            />
            <br />
            <Field
              as={TextField}
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password ? errors.password : ""
              }
              required
              fullWidth
            />
            <br />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "5px",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
                component={Link}
                to="/signup"
                variant="body1"
                color="primary"
                onClick={navigateToSignUp}
              >
                Have an account? Sign up
              </Typography>
              or
              <LoginButton />
            </Box>
          </Form>
        )}
      </Formik>
    </StyledContainer>
  );
};

export default SignIn;

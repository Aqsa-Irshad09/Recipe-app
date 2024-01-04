import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Typography, Box } from "@mui/material";
import { StyledButton, StyledContainer } from "./SignInStyles";
import { generateValidationSchema } from "../../validations";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/loginUserSlice";
import { Link, useNavigate } from "react-router-dom";

import LoginButton from "../../components/LoginButton";

const SignIn = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fields = ["email", "password"];

  const validationSchema = generateValidationSchema(fields);

  const handleSubmit = async (values) => {
    dispatch(loginUser(values));
  };

  // const isLoggedIn = localStorage.getItem("isLoggedIn");
  // if (isLoggedIn === "true") {
  //   navigate("/");
  // }
  const navigateToSignUp = (e) => {
    e.preventDefault();
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
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </StyledButton>
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
                  padding: "10px 0",
                }}
                component={Link}
                to="/signup"
                variant="body1"
                color="primary"
                onClick={navigateToSignUp}
              >
                Have an account? <strong>Sign up</strong>
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

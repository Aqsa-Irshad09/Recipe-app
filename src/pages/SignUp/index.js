import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Typography, Box } from "@mui/material";
import { StyledContainer } from "./SignUpStyles";
import { generateValidationSchema } from "../../validations";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/features/registerUserSlice";
import LoginButton from "../../components/LoginButton";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fields = ["name", "email", "password", "confirmPassword", "phone"]; // Define fields for sign-up form

  const validationSchema = generateValidationSchema(fields); // Generate validation schema based on fields

  const handleSubmit = (values) => {
    dispatch(registerUser(values));
    console.log("Sign Up form submitted:", values);
  };
  const navigateToSignIn = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate("/signin");
  };
  return (
    <StyledContainer>
      <Typography variant="h2" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              label="Name"
              name="name"
              variant="outlined"
              error={errors.name && touched.name}
              helperText={errors.name && touched.name ? errors.name : ""}
              required
              fullWidth
            />
            <br />
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
            <Field
              as={TextField}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              error={errors.confirmPassword && touched.confirmPassword}
              helperText={
                errors.confirmPassword && touched.confirmPassword
                  ? errors.confirmPassword
                  : ""
              }
              required
              fullWidth
            />
            <br />
            <Field
              as={TextField}
              label="Phone"
              name="phone"
              variant="outlined"
              error={errors.phone && touched.phone}
              helperText={errors.phone && touched.phone ? errors.phone : ""}
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
                paddingTop: "5px",
              }}
            >
              <Typography
                py={2}
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
                onClick={navigateToSignIn}
              >
                Already Have Account? Sign in
              </Typography>

              <LoginButton />
            </Box>
          </Form>
        )}
      </Formik>
    </StyledContainer>
  );
};

export default SignUp;

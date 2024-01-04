import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Typography, Box } from "@mui/material";
import { StyledButton, StyledContainer } from "./SignUpStyles";
import { generateValidationSchema } from "../../validations";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/features/registerUserSlice";
import LoginButton from "../../components/LoginButton";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fields = ["name", "email", "password", "confirmPassword", "phone"];

  const validationSchema = generateValidationSchema(fields);
  const registerUserData = useSelector((state) => state.user.register_users);

  const { error, status, user } = registerUserData || {};
  console.log("error", error);
  const handleSubmit = (values) => {
    try {
      dispatch(registerUser(values));
    } catch (err) {
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Registration successful!");
      navigate("/signin");
    }
  }, [status]);

  const navigateToSignIn = (e) => {
    e.preventDefault();
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
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
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
                  padding: "10px 0",
                }}
                component={Link}
                to="/signup"
                variant="body1"
                color="primary"
                onClick={navigateToSignIn}
              >
                Already Have Account? <strong>Sign in</strong>
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

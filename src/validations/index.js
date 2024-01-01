import * as Yup from "yup";

export const generateValidationSchema = (fields) => {
  const validationSchemaObject = {};

  fields.forEach((field) => {
    switch (field) {
      case "name":
        validationSchemaObject.name = Yup.string()
          .min(3, "Name must be at least 3 characters")
          .max(20, "Name must be at least 20 characters")
          .required("Name is required");
        break;
      case "email":
        validationSchemaObject.email = Yup.string()
          .email("Invalid email")
          .required("Email is required");
        break;
      case "password":
        validationSchemaObject.password = Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required");
        break;
      case "confirmPassword":
        validationSchemaObject.confirmPassword = Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Please confirm your password");
        break;
      case "phone":
        validationSchemaObject.phone = Yup.string()
          .matches(
            /^\+92[0-9]{10}$/,
            "Invalid phone number (e.g., +923001234567)"
          )
          .required("Phone number is required");
        break;
      default:
        break;
    }
  });

  return Yup.object().shape(validationSchemaObject);
};

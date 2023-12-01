import { LoginData, NewUserSignup, ResetPassword } from "typedef";
import { Schema, object, string, ref } from "yup";

export const userSignupValues: NewUserSignup = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  phoneNumber: "",
  password: "",
};

export const userSignupValidationSchema: Schema<NewUserSignup> = object().shape(
  {
    firstName: string()
      .required("First name cannot be blank")
      .min(2, "First name must be a least 2 characters in length"),
    lastName: string().required("Last name cannot be blank").min(2),
    email: string()
      .email("Enter a valid email address")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
      .required("Email is required"),
    address: string().min(10).required("Address cannot be blank"),
    phoneNumber: string()
      .required("Phone number cannot be blank")
      .min(11, "Phone number must be at least 11 characters")
      .max(11, "Phone number cannot be more than 11 characters")
      .matches(
        /^([0]{1})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7,8})$/,
        "Phone number must be a valid Nigerian number. E.g 09023456789"
      ),
    password: string()
      .min(10, "Password must be at least 10 characters long")
      .matches(
        /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,25}$/,
        "Password must contain one uppercase. one lowercase, one number and one special character"
      )
      .max(25, "Password must not be more than 25 characters in length")
      .required("Password field cannot be blank"),
  }
);

export const loginValues: LoginData = {
  email: "",
  password: "",
};

export const userLoginValidationSchema: Schema<LoginData> = object().shape({
  email: string()
    .email("Enter a valid email address")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    .required("Email is required"),
  password: string()
    .required("Password field cannot be blank")
    .min(8, "Password must be at least 8 characters long")
    .max(25, "Password must not be more than 25 characters in length"),
});

export const passwordResetValues = {
  email: "",
};

export const passwordResetValidationSchema = object().shape({
  email: string()
    .email("Enter a valid email address")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Enter a valid email address")
    .required("Email is required"),
});

export const resetPasswordValues: ResetPassword = {
  newPassword: "",
  confirmPassword: "",
};

export const resetPasswordValidationSchema: Schema<ResetPassword> =
  object().shape({
    newPassword: string()
      .required("Password field cannot be blank")
      .matches(
        /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,25}$/,
        "Password must contain one uppercase. one lowercase, one number and one special character"
      )
      .min(8, "Password must be at least 8 characters long")
      .max(25, "Password must not be more than 25 characters in length"),
    confirmPassword: string()
      .oneOf([ref("newPassword")], "Passwords must match")
      .required("Confirm password cannot be blank"),
  });

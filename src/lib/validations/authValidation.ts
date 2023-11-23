import { LoginData, NewUserSignup } from "typedef";
import { Schema, object, string } from "yup";

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
      .required("Password field cannot be blank")
      .min(10, "Password must be at least 8 characters long")
      .max(25, "Password must not be more than 25 characters in length"),
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
    .matches(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{10,25}$/)
    .min(10, "Password must be at least 8 characters long")
    .max(25, "Password must not be more than 25 characters in length"),
});

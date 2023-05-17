import Joi from "joi";
import { LoginData, INewListing, NewUser } from "typedef";
import { object, string } from "yup";

export const validateUserObject = (data: NewUser) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).trim().required().messages({
      "string.base": "First name should be a type of text",
      "string.empty": "First name cannot be empty",
      "string.min": "First name should be at least 3 characters long",
      "string.max": "First name should not be more than 30 characters long",
      "any.required": "First name is required",
    }),
    lastName: Joi.string().min(3).max(30).trim().required().messages({
      "string.base": "Last name should be a type of text",
      "string.empty": "Last name cannot be empty",
      "string.min": "Last name should be at least 3 characters long",
      "string.max": "Last name should not be more than 30 characters long",
      "any.required": "Last name is required",
    }),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .trim()
      .required()
      .messages({
        "string.email": "Must be a valid email",
        "any.required": "Email is required",
      }),
    address: Joi.string().min(3).required().trim().messages({
      "string.base": "Address should be a type of text",
      "string.empty": "Address cannot be empty",
      "string.min": "Address should be at least 3 characters long",
      "any.required": "Address is required",
    }),
    phoneNumber: Joi.string()
      .length(11)
      .regex(/^([0]{1})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7,8})$/)
      .required()
      .trim()
      .messages({
        "string.length": "Phone number must be 11 character long digits",
        "string.empty": "Phone number cannot be empty",
        "string.pattern.base":
          "Phone number must be a valid Nigerian number e.g 08023456789",
        "any.required": "Phone number is required",
      }),
    password: Joi.string().min(8).required().messages({
      "string.min": "Password should be 8 or more characters long",
      "string.empty": "Password cannot be empty",
      "any.required": "Password is required",
    }),
  }).options({ abortEarly: false });
  return schema.validate(data);
};

export const validateLoginData = (data: LoginData) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .message("Must be a valid email")
      .trim()
      .required(),
    password: Joi.string()
      .min(8)
      .message("Password should be 8 or more characters long")
      .required(),
  }).options({ abortEarly: false });
  return schema.validate(data);
};

export const validateNewListingObject = (data: INewListing) => {
  const schema = Joi.object({
    name: Joi.string().min(10).trim().required(),
    address: Joi.string().min(10).required().trim(),
    available: Joi.boolean().default(false),
    state: Joi.string().required(),
    description: Joi.string().required(),
  }).options({ abortEarly: false });
  return schema.validate(data);
};

export const userSignupValidationSchema = object().shape({
  firstName: string()
    .required("First name cannot be blank")
    .min(2, "First name must be a least 2 characters in length"),
  lastName: string().required("Last name cannot be blank").min(2),
  email: string()
    .email("Enter a valid email address")
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
    .min(8, "Password must be at least 8 characters long")
    .max(25, "Password must not be more than 25 characters in length"),
});

export const userLoginValidationSchema = object().shape({
  email: string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: string()
    .required("Password field cannot be blank")
    .min(8, "Password must be at least 8 characters long")
    .max(25, "Password must not be more than 25 characters in length"),
});

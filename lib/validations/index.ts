import Joi from "joi";
import { ILogin, INewListing, NewUser } from "typedef";

export const validateUserObject = (data: NewUser) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(30)
      .message("First name is required")
      .trim()
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(30)
      .message("Last name is required")
      .trim()
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .message("Must be a valid email")
      .trim()
      .required(),
    address: Joi.string().min(3).required().trim(),
    phoneNumber: Joi.string()
      .length(11)
      .regex(/^\d+$/)
      .message("Phone number must be 11 character long digits")
      .required()
      .trim(),
    password: Joi.string()
      .min(8)
      .message("Password should be 8 or more characters long")
      .required(),
  }).options({ abortEarly: false });
  return schema.validate(data);
};

export const validateLoginData = (data: ILogin) => {
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

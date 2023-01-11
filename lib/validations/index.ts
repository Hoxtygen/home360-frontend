import Joi from "joi";
import { NewUser } from "typedef";

export const validateUserObject = (data: NewUser) => {
	const schema = Joi.object({
		name: Joi.string()
			.min(3)
			.max(30)
			.message("Name is required")
			.trim()
			.required(),
		email: Joi.string()
			.email({ minDomainSegments: 2 })
			.message("Must be a valid email")
			.trim()
			.required(),

		address: Joi.string()
			.min(3)
			.required()
			.trim(),

		phoneNumber: Joi.string()
			.length(11)
			.regex(/^\d+$/)
			.message("Phone number must be 11 character long digits")
			.required()
			.trim(),

	}).options({ abortEarly: false })
	return schema.validate(data)
}



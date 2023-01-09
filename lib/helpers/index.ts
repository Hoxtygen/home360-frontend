import { ValidationError } from "joi";

export function mapError(data: ValidationError) {
	return data.details.map(({ message, context }) => {
		return {
			field: context?.label,
			errorMessage: message.replace(/[^\sa-zA-Z0-9]+/gi, "")
		}
	})
}

export function isEmailValid(email: string) {
	if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
		return true
	}
	return false
}
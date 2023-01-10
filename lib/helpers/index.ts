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


/**
 * The cuid library only guarantee that a cuid string will start with c. No 
 * guaranteed length by the algorithm. Making it at least 8 here is just 
 * preferential 
 *
 * @export
 * @param {string} stringToCheck
 * @return {boolean} bool
 */
export function isCuid(stringToCheck: string | undefined) {
if (typeof stringToCheck !== "string" || stringToCheck === "") return false;
if (stringToCheck.startsWith('c') && stringToCheck.length > 7) return true;
return false;
}
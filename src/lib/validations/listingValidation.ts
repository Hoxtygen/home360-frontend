import { maxCharacter } from "constant-data/staticData";
import { ListingEnquiryData, ListingProps } from "features/listings/types";
import { array, date, number, object, ref, Schema, string } from "yup";

export const initialValues: ListingProps = {
  title: "",
  description: "",
  furnishing: "",
  position: "",
  miscellaneous: "",
  address: {
    streetName: "",
    houseNumber: "",
    city: "",
    state: "",
    lga: "",
  },
  availableFrom: "",
  cost: {
    annualRent: 0,
    agentFee: 0,
    cautionFee: 0,
    agreementFee: 0,
  },
  details: [],
  facilityQuality: "SIMPLE",
  petsAllowed: "",
  apartmentInfo: {
    roomNums: "",
    bathroomNums: "",
    bedroomNums: "",
    apartmentType: "",
  },
  applicationDocs: [],
  apartmentImages: [],
};

export const newListingValidationSchema = object().shape({
  title: string().required("Advert title is required"),
  description: string().required("description  is required").max(2000),
  furnishing: string().required("furnishing information is required").max(2000),
  position: string().max(5000),
  miscellaneous: string().max(2000),
  address: object().shape({
    streetName: string().required("street name is required"),
    houseNumber: string(),
    city: string().required("city is required"),
    state: string().required("state is required"),
    lga: string().required("local government area is required"),
  }),
  availableFrom: date()
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      "Apartment cannot be available earlier than today"
    )
    .required("Date apartment will be available is required"),
  cost: object().shape({
    annualRent: number()
      .integer()
      .positive("Must be a postive number")
      .min(1, "Annual rent must be greater than 0")
      .required("Annual rent is required"),
    agentFee: number().integer(),
    cautionFee: number().integer(),
    agreementFee: number().integer(),
  }),
  details: array().default([]),
  facilityQuality: string().required("Quality of the facility is required"),
  petsAllowed: string().required("Indicate if pet is allowed"),
  apartmentInfo: object().shape({
    roomNums: string().required("Number of rooms in the apartment is required"),
    bathroomNums: string().required("number of bathrooms is required"),
    bedroomNums: string().required("number of bedrooms is required"),
    apartmentType: string().required("apartment type is required"),
  }),
  applicationDocs: array().default([]),
  apartmentImages: array().min(1).required(),
});

export const listingEnquiryValidationSchema: Schema<ListingEnquiryData> =
  object().shape({
    message: string()
      .required("Message is required")
      .max(maxCharacter, `Maximum of ${maxCharacter} characters allowed`),
    salutation: string().trim().required("Salutation is required"),
    firstName: string()
      .required("First name is required")
      .min(2, "First name must be a least 2 characters in length"),
    lastName: string().required("Last name is required").min(2),
    email: string()
      .email("Enter a valid email address")
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Enter a valid email address"
      )
      .required("Email is required"),
    phoneNumber: string()
      .required("Phone number is required")
      .min(11, "Phone number must be at least 11 characters")
      .max(11, "Phone number cannot be more than 11 characters")
      .matches(
        /^([0]{1})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7,8})$/,
        "Phone number must be a valid Nigerian number. E.g 09023456789"
      ),
    location: string().required("Location is required"),
    pets: string().required("Indicate if you  have pets"),
    commercialPurpose: string().required(
      "Indicate if you  want to use this apartment for commercial purposes"
    ),
    employmentStatus: string().required("Employment type is required"),
  });

export const rentValidationSchema = object().shape({
  renterEmail: string()
    .email("Enter a valid email address")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Enter a valid email address")
    .required("Renter email is required"),
  rentStartDate: date()
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      "Rent cannot start earlier than today"
    )
    .required("Date apartment will be available is required"),
  rentDueDate: date()
    .required("Rent due date is required")
    .min(
      ref("rentStartDate"),
      "Rent due date cannot be earlier than rent start date"
    )
    .test(
      "is-after-start-date",
      "Rent due date cannot be the same as rent start date",
      (value, context) => {
        const rentStartDate = context.parent.rentStartDate;
        return value > rentStartDate;
      }
    )
    .test(
      "is-one-year-later",
      "Rent due date must be exactly one year after rent start date",
      (value, context) => {
        const rentStartDate = context.parent.rentStartDate;
        if (!rentStartDate || !value) return false;

        const diffInMilliseconds = value.getTime() - rentStartDate.getTime();
        const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

        return Math.abs(diffInYears - 1) < 0.01;
      }
    ),
});

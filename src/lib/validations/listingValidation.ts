import { ListingProps } from "typedef";
import { object, string, date, array, Schema } from "yup";

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
  availableFrom: new Date(""),
  cost: {
    annualRent: "",
    agentFee: "",
    cautionFee: "",
    agreementFee: "",
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
export const newListingValidationSchema: Schema<ListingProps> = object().shape({
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
    annualRent: string().required("Annual rent is required"),
    agentFee: string(),
    cautionFee: string(),
    agreementFee: string(),
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

import { useFormik } from "formik";

import { Button } from "components/buttons/Button";
import Dropdown from "components/dropdown/Dropdown";
import AutoTextArea from "components/inputs/AutoTextArea";
import { Input } from "components/inputs/Input";
import InputLabel from "components/inputs/InputLabel";
import { states } from "constants/states";
import { employmentType, maxCharacter, salutation } from "constants/staticData";
import { formatString, getRemainingCharacter } from "lib/utils/utils";
import { listingEnquiryValidationSchema } from "lib/validations/listingValidation";
import ErrorMessage from "shared/ErrorMessage";
import { ListingEnquiryFormProps } from "../types";

export default function ListingEnquiryForm({
  listingEnquiryInitialValues,
  listingId,
  agentId,
  isLoading,
  handleSubmitEnquiryForm,
}: ListingEnquiryFormProps) {
  const formik = useFormik({
    validationSchema: listingEnquiryValidationSchema,
    onSubmit: (values) =>
      handleSubmitEnquiryForm({ ...values, listingId, agentId }),
    initialValues: listingEnquiryInitialValues,
  });

  const {
    errors,
    touched,
    handleBlur,
    handleChange,
    values,
    handleSubmit,
    setFieldValue,
    isValid,
    dirty,
  } = formik;

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <AutoTextArea
            cols={30}
            label="Write a Message"
            maxLength={maxCharacter}
            name="message"
            placeholder="message content"
            id="message"
            value={values.message}
            onBlur={handleBlur}
            onChange={handleChange}
            className="w-full"
            autoComplete="on"
          />
          <div className="flex flex-row-reverse justify-between items-center">
            <p className="text-[12px]">
              {getRemainingCharacter(
                maxCharacter,
                Number(values.message.length)
              )}{" "}
              characters remaining
            </p>
            {touched.message && errors.message && (
              <ErrorMessage className="text-red-500" error={errors.message} />
            )}
          </div>
        </div>
        <div className="mb-4">
          <InputLabel label="Salutation" htmlFor="salutation" />
          <Dropdown
            name="salutation"
            data={salutation}
            id="salutation"
            title="Select Salutation"
            onSelect={(data) => setFieldValue("salutation", data)}
          />
          {touched.salutation && errors.salutation && (
            <ErrorMessage className="text-red-500" error={errors.salutation} />
          )}
        </div>

        <div className=" mb-5">
          <Input
            placeholder="Enter first name"
            name="firstName"
            id="firstName"
            type="text"
            className="w-full"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            label="First Name"
          />
          {touched.firstName && errors.firstName && (
            <ErrorMessage className="text-red-500" error={errors.firstName!} />
          )}
        </div>
        <div className=" mb-5">
          <Input
            placeholder="Enter last name"
            name="lastName"
            id="lastName"
            label="Last Name"
            type="text"
            className="w-full"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.lastName && errors.lastName && (
            <ErrorMessage className="text-red-500" error={errors.lastName!} />
          )}
        </div>
        <div className=" mb-5">
          <Input
            placeholder="Enter email"
            id="email"
            name="email"
            type="email"
            label="Email"
            className="w-full"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="on"
          />
          {touched.email && errors.email && (
            <ErrorMessage className="text-red-500" error={errors.email!} />
          )}
        </div>
        <div className=" mb-5">
          <Input
            placeholder="Enter phone number"
            name="phoneNumber"
            id="phoneNumber"
            type="text"
            label="Phone Number"
            className="w-full"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={handleBlur}
          />
          {touched.phoneNumber && errors.phoneNumber && (
            <ErrorMessage
              className="text-red-500"
              error={errors.phoneNumber!}
            />
          )}
        </div>

        <div className="mb-4">
          <InputLabel label="Location" htmlFor="location" />
          <Dropdown
            data={states}
            name="location"
            id="location"
            title="Select your location"
            onSelect={(item) => setFieldValue("location", item)}
          />
          {touched.location && errors.location && (
            <ErrorMessage className="text-red-500" error={errors.location} />
          )}
        </div>
        <div className="mb-4">
          <InputLabel label="Employment Status" htmlFor="employmentStatus" />
          <Dropdown
            data={employmentType}
            name="employmentStatus"
            id="employmentStatus"
            title="Select Employment Type"
            onSelect={(event) => {
              setFieldValue("employmentStatus", formatString(event as string));
            }}
          />
          {touched.employmentStatus && errors.employmentStatus && (
            <ErrorMessage
              className="text-red-500"
              error={errors.employmentStatus}
            />
          )}
        </div>
        <div className="mb-4">
          <InputLabel label="Pets" htmlFor="pets" />
          <Dropdown
            data={yesNo}
            name="pets"
            id="pets"
            title="Do you have pets?"
            onSelect={(data) => {
              setFieldValue("pets", data);
            }}
          />
          {touched.pets && errors.pets && (
            <ErrorMessage className="text-red-500" error={errors.pets} />
          )}
        </div>

        <div className="mb-4">
          <InputLabel label="Commercial Purpose" htmlFor="commercialPurpose" />
          <Dropdown
            data={yesNo}
            name="commercialPurpose"
            id="commercialPurpose"
            title="For commercial purpose?"
            onSelect={(data) => {
              setFieldValue("commercialPurpose", data);
            }}
          />
          {touched.commercialPurpose && errors.commercialPurpose && (
            <ErrorMessage
              className="text-red-500"
              error={errors.commercialPurpose}
            />
          )}
        </div>
        <div className="w-full pb-7">
          <Button
            className="w-full dark:text-white"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            isLoading={isLoading}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

const yesNo = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
];

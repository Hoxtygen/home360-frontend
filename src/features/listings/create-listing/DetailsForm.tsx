import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "shared/ErrorMessage";
import { ListingProps } from "../types";
import { CheckboxGroup } from "components/checkbox";
import { apartmentDetails, facilityQuality, petsAllowed } from "constant-data";
import { RadioGroup } from "components/radio";

export default function DetailsForm() {
  const { values, errors, touched, handleChange, setFieldValue } =
    useFormikContext<ListingProps>();
  return (
    <div className="">
      <div className="">
        <CheckboxGroup
          options={apartmentDetails}
          className="dark:text-white"
          label="Details"
          name="details"
          onChange={(event) => {
            const { checked, value } = event.target;
            if (checked) {
              setFieldValue("details", [...values.details, value]);
            } else {
              setFieldValue(
                "details",
                values.details.filter((item) => item !== value)
              );
            }
          }}
        />
      </div>
      <RadioGroup
        options={facilityQuality}
        label="Quality of facilites"
        onChange={handleChange}
        name="facilityQuality"
      />
      {touched.facilityQuality && errors.facilityQuality && (
        <ErrorMessage error={errors.facilityQuality} />
      )}
      <RadioGroup
        options={petsAllowed}
        label="Pets Allowed"
        onChange={handleChange}
        className=""
        name="petsAllowed"
      />
      {touched.petsAllowed && errors.petsAllowed && (
        <ErrorMessage error={errors.petsAllowed} />
      )}
    </div>
  );
}

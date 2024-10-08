import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "shared/ErrorMessage";
import { ListingProps } from "../types";
import { CheckboxGroup } from "components/checkbox";
import { applicationDocs } from "constant-data/staticData";
import UploadComponent from "components/inputs/UploadComponent";

export default function ApplicationDocumentsForm() {
  const { values, errors, touched, setFieldValue } =
    useFormikContext<ListingProps>();
  return (
    <div>
      <div className="">
        <CheckboxGroup
          label="Application documents"
          options={applicationDocs}
          name="applicationDocs"
          onChange={(event) => {
            const { checked, value } = event.target;
            if (checked) {
              setFieldValue("applicationDocs", [
                ...values.applicationDocs,
                value,
              ]);
            } else {
              setFieldValue(
                "applicationDocs",
                values.applicationDocs.filter((item) => item !== value)
              );
            }
          }}
        />
      </div>
      <div className="">
        <h3 className="font-semibold mb-4">Pictures</h3>
        <UploadComponent name="apartmentImages" setFieldValue={setFieldValue} />
        {touched.apartmentImages && errors.apartmentImages && (
          <ErrorMessage error={errors.apartmentImages.toString()} />
        )}
      </div>
    </div>
  );
}

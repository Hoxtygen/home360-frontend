import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "shared/ErrorMessage";
import { Input } from "components/input";
import { ListingProps } from "../types";
import { getRemainingCharacter } from "lib/utils/utils";
import { maxCharacter } from "constant-data/staticData";
import { AutoTextArea } from "components/autotextArea";

export default function ListingDescriptionForm() {
  const { values, errors, touched, handleBlur, handleChange } =
    useFormikContext<ListingProps>();
  return (
    <div>
      <div className="">
        <h2 className="mb-4 font-semibold">Description</h2>
        <div className="mb-4">
          <Input
            className="rounded-md text-base w-full"
            label="Title"
            name="title"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="title of the advert"
            type="text"
            value={values.title}
            id="title"
          />
          {touched.title && errors.title && (
            <ErrorMessage error={errors.title} />
          )}
        </div>
        <div className="mb-4">
          <AutoTextArea
            className="w-full"
            cols={30}
            label="Description"
            maxLength={2000}
            name="description"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Give a brief description.e.g old building, corner house"
            value={values.description}
            id="description"
          />
          <p className="text-right text-xs">
            {getRemainingCharacter(
              maxCharacter,
              Number(values.description.length)
            )}{" "}
            characters remaining
          </p>
          {touched.description && errors.description && (
            <ErrorMessage error={errors.description} />
          )}
        </div>
        <div className="mb-5">
          <AutoTextArea
            className="w-full"
            cols={30}
            label="Furnishing"
            maxLength={2000}
            name="furnishing"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="e.g Full pop, half pop, floor-to-ceiling windows, fireplace, underfloor, heating"
            value={values.furnishing}
            id="furnishing"
          />
          <p className="text-right text-xs">
            {getRemainingCharacter(
              maxCharacter,
              Number(values.furnishing.length)
            )}{" "}
            characters remaining
          </p>
          {touched.furnishing && errors.furnishing && (
            <ErrorMessage error={errors.furnishing} />
          )}
        </div>
        <div className="mb-5">
          <AutoTextArea
            className="w-full"
            cols={30}
            label="Position"
            maxLength={2000}
            name="position"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="e.g around airport, around GRA, 34 minutes away from Government house"
            value={values.position}
            id="position"
          />
          <p className="text-right text-xs">
            {getRemainingCharacter(
              maxCharacter,
              Number(values.position?.length)
            )}{" "}
            characters remaining
          </p>
          {touched.position && errors.position && (
            <ErrorMessage error={errors.position} />
          )}
        </div>
        <div className="mb-5">
          <AutoTextArea
            className="w-full"
            cols={30}
            label="Miscellaneous"
            maxLength={2000}
            name="miscellaneous"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="For whom is the property suitable, contractual specifics"
            value={values.miscellaneous}
            id="miscellaneous"
          />
          <p className="text-right text-xs">
            {getRemainingCharacter(
              maxCharacter,
              Number(values.miscellaneous?.length)
            )}{" "}
            characters remaining
          </p>
          {touched.miscellaneous && errors.miscellaneous && (
            <ErrorMessage error={errors.miscellaneous} />
          )}
        </div>
      </div>
    </div>
  );
}

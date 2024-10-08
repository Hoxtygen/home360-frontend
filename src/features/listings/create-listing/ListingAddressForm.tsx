import React, { useState } from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "shared/ErrorMessage";
import { Input } from "components/input";
import { ListingProps } from "../types";
import { InputLabel } from "components/inputLabel";
import NigerianStates from "constant-data/nigeria-states";

export default function ListingAddressForm() {
  const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
    useFormikContext<ListingProps>();
  const [lgas, setLgas] = useState<string[] | undefined>([]);
  return (
    <div className="">
      <h2 className="mb-4 font-semibold">Address</h2>
      <div className="flex justify-between mb-4">
        <div className="basis-9/12 mr-2">
          <Input
            className="rounded-md  text-base w-full md:flex-4 md:mr-3 "
            label="Street Name"
            name="address.streetName"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="street name"
            type="text"
            value={values.address.streetName}
            id="streetName"
          />
          {touched.address?.streetName && errors.address?.streetName && (
            <ErrorMessage error={errors.address?.streetName} />
          )}
        </div>
        <div className="basis-2/12">
          <Input
            className="rounded-md  text-base w-full"
            label="Number"
            name="address.houseNumber"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="house number"
            type="text"
            value={values.address.houseNumber}
            id="houseNumber"
          />
          {errors.address?.houseNumber && (
            <ErrorMessage error={errors.address?.houseNumber} />
          )}
        </div>
      </div>
      <div className="">
        <div className="lg:flex justify-between">
          <div className="lg:w-5/12 mb-4">
            <InputLabel label="State" htmlFor="state" />
            <select
              name="address.state"
              id="state"
              className="p-3 border-gray-400 border rounded-md w-full"
              placeholder="state name"
              value={values.address.state}
              onChange={(event) => {
                const { value } = event.target;
                setFieldValue("address.state", value);
                setFieldValue("address.lga", "");
                setLgas(
                  NigerianStates.find(
                    (state) => state.name === event.target.value
                  )?.lgs
                );
              }}
              onBlur={handleBlur}
            >
              <option value="">--Please choose an option--</option>
              {NigerianStates.map((state) => (
                <option value={state.name} key={state.capital}>
                  {state.name}
                </option>
              ))}
            </select>
            {touched.address?.state && errors.address?.state && (
              <ErrorMessage error={errors.address.state} />
            )}
          </div>

          <div className="lg:w-5/12 mb-4">
            <InputLabel label="Local government" htmlFor="lga" />
            <select
              name="address.lga"
              className="p-3 border-gray-400 border rounded-md  w-full"
              value={values.address.lga}
              id="lga"
              onChange={(event) => {
                const { value } = event.target;
                setFieldValue("address.lga", value);
              }}
              onBlur={handleBlur}
            >
              <option value="">--Please choose an option--</option>
              {lgas &&
                lgas.map((lg) => (
                  <option value={lg} key={lg}>
                    {lg}
                  </option>
                ))}
            </select>
            {touched.address?.lga && errors.address?.lga && (
              <ErrorMessage error={errors.address.lga} />
            )}
          </div>
        </div>
        <div className="mb-4">
          <Input
            className="rounded-md text-base w-full"
            label="City"
            name="address.city"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="city name"
            type="text"
            value={values.address.city}
            id="city"
          />
          {touched.address?.city && errors.address?.city && (
            <ErrorMessage error={errors.address?.city} />
          )}
        </div>
      </div>
    </div>
  );
}

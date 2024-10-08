import React from "react";
import { useFormikContext } from "formik";
import { Input } from "components/input";

import { ListingProps } from "../types";
import ErrorMessage from "shared/ErrorMessage";
import { ButtonAroundInput } from "components/inputs/ButtonAroundInput";
import { addValues, formatCurrency } from "lib/utils/utils";
import { Select } from "components/select";
import { apartmentType } from "constant-data";

export default function TenancyForm() {
  const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
    useFormikContext<ListingProps>();
  return (
    <div className="">
      <h2 className="mb-4 font-semibold">Tenancy</h2>
      <div className="sm:fle flex-wrap justify-between">
        <div className="basis-5/12 mb-4">
          <Select
            className="py-2 border-black"
            id="apartmentType"
            label="Apartment Type"
            name="apartmentInfo.apartmentType"
            onBlur={handleBlur}
            onChange={handleChange}
            options={apartmentType}
            value={values.apartmentInfo.apartmentType}
            title="Select apartment type"
            format={true}
          />
          {touched.apartmentInfo?.apartmentType &&
            errors.apartmentInfo?.apartmentType && (
              <ErrorMessage error={errors.apartmentInfo?.apartmentType} />
            )}
        </div>

        <div className="basis-5/12 mb-4">
          <ButtonAroundInput
            type="number"
            min={0}
            name="apartmentInfo.roomNums"
            placeholder="number of rooms"
            className="rounded-none text-base text-center w-full"
            label="Number of Rooms"
            onChange={handleChange}
            id="roomNums"
            value={values.apartmentInfo.roomNums}
            onBlur={handleBlur}
            handleIncreaseValue={() => {
              setFieldValue(
                "apartmentInfo.roomNums",
                Number(values.apartmentInfo.roomNums) + 1
              );
            }}
            handleDecreaseValue={() => {
              if (Number(values.apartmentInfo.roomNums) > 1) {
                setFieldValue(
                  "apartmentInfo.roomNums",
                  Number(values.apartmentInfo.roomNums) - 1
                );
              }
            }}
          />
          {touched.apartmentInfo?.roomNums &&
            errors.apartmentInfo?.roomNums && (
              <ErrorMessage error={errors.apartmentInfo?.roomNums} />
            )}
        </div>
        <div className="mb-4 ">
          <ButtonAroundInput
            type="number"
            min={0}
            name="apartmentInfo.bedroomNums"
            placeholder="number of bedrooms"
            className="text-base text-center w-full"
            label="Number of bedrooms"
            onChange={handleChange}
            value={values.apartmentInfo.bedroomNums}
            onBlur={handleBlur}
            id="bedroomNums"
            handleIncreaseValue={() => {
              setFieldValue(
                "apartmentInfo.bedroomNums",
                Number(values.apartmentInfo.bedroomNums) + 1
              );
            }}
            handleDecreaseValue={() => {
              if (Number(values.apartmentInfo.bedroomNums) > 0) {
                setFieldValue(
                  "apartmentInfo.bedroomNums",
                  Number(values.apartmentInfo.bedroomNums) - 1
                );
              }
            }}
          />
          {touched.apartmentInfo?.bedroomNums &&
            errors.apartmentInfo?.bedroomNums && (
              <ErrorMessage error={errors.apartmentInfo?.bedroomNums} />
            )}
        </div>

        <div className="basis-5/12 mb-4">
          <ButtonAroundInput
            type="number"
            min={0}
            name="apartmentInfo.bathroomNums"
            placeholder="number of bathrooms"
            className="text-base text-center w-full "
            label="bathrooms"
            onChange={handleChange}
            value={values.apartmentInfo.bathroomNums}
            onBlur={handleBlur}
            id="bathroomNums"
            handleIncreaseValue={() => {
              setFieldValue(
                "apartmentInfo.bathroomNums",
                Number(values.apartmentInfo.bathroomNums) + 1
              );
            }}
            handleDecreaseValue={() => {
              if (Number(values.apartmentInfo.bathroomNums) > 0) {
                setFieldValue(
                  "apartmentInfo.bathroomNums",
                  Number(values.apartmentInfo.bathroomNums) - 1
                );
              }
            }}
          />
          {touched.apartmentInfo?.bathroomNums &&
            errors.apartmentInfo?.bathroomNums && (
              <ErrorMessage error={errors.apartmentInfo?.bathroomNums} />
            )}
        </div>
      </div>

      <div className="basis-6/12 mb-4">
        <Input
          type="datetime-local"
          name="availableFrom"
          placeholder="date when apartment will be available"
          className="rounded-md text-base w-full"
          label="Available from"
          onChange={handleChange}
          value={values.availableFrom}
          onBlur={handleBlur}
          id="availableFrom"
        />
        {touched.availableFrom && errors.availableFrom && (
          <ErrorMessage error={String(errors.availableFrom)} />
        )}
      </div>

      <div className="lg:flex justify-between">
        <div className="basis-2/4 mb-4 lg:mb-0">
          <div className="mb-4">
            <Input
              className="rounded-md text-base w-full"
              id="annualRent"
              label="Annual rent fee"
              name="cost.annualRent"
              onBlur={handleBlur}
              onChange={handleChange}
              onWheel={(e) => e.currentTarget.blur()}
              placeholder="annual rent"
              type="number"
              value={values.cost.annualRent}
            />
            {touched.cost?.annualRent && errors.cost?.annualRent && (
              <ErrorMessage error={errors.cost?.annualRent} />
            )}
          </div>

          <div className="mb-4">
            <Input
              className="rounded-md text-base w-full"
              id="agentFee"
              label="Agent fee"
              name="cost.agentFee"
              onBlur={handleBlur}
              onChange={handleChange}
              onWheel={(e) => e.currentTarget.blur()}
              placeholder="agent fee"
              type="number"
              value={values.cost?.agentFee}
            />
            {touched.cost?.agentFee && errors.cost?.agentFee && (
              <ErrorMessage error={errors.cost?.agentFee} />
            )}
          </div>
          <div className="mb-4">
            <Input
              className="rounded-md text-base w-full"
              id="cautionFee"
              label="Caution fee"
              name="cost.cautionFee"
              onBlur={handleBlur}
              onChange={handleChange}
              onWheel={(e) => e.currentTarget.blur()}
              placeholder="caution fee"
              type="number"
              value={values.cost.cautionFee}
            />
            {touched.cost?.cautionFee && errors.cost?.cautionFee && (
              <ErrorMessage error={errors.cost?.cautionFee} />
            )}
          </div>
          <div className="mb-4">
            <Input
              className="rounded-md text-base w-full"
              id="agreementFee"
              label="Agreement fee"
              name="cost.agreementFee"
              onBlur={handleBlur}
              onChange={handleChange}
              onWheel={(e) => e.currentTarget.blur()}
              placeholder="agreement fee"
              type="number"
              value={values.cost.agreementFee}
            />
            {touched.cost?.agreementFee && errors.cost?.agreementFee && (
              <ErrorMessage error={errors.cost?.agreementFee} />
            )}
          </div>
        </div>
        <div className="px-4 basis-2/4 mb-4 lg:mb-0 text-18 font-hanken-semibold">
          <div className="flex justify-between">
            <p>Annual rent</p>
            <p>{formatCurrency(values.cost.annualRent)}</p>
          </div>
          <div className="flex justify-between">
            <p>Agent Fee</p>
            <p>{formatCurrency(values.cost.agentFee)}</p>
          </div>
          <div className="flex justify-between">
            <p>Caution Fee</p>
            <p>{formatCurrency(values.cost.cautionFee)}</p>
          </div>
          <div className="flex justify-between">
            <p>Agreement Fee</p>
            <p>{formatCurrency(values.cost.agreementFee)}</p>
          </div>
          <hr className="text-black bg-black h-[2px]" />
          <div className="flex justify-between">
            <p>Total</p>
            <p>{formatCurrency(addValues(values.cost))}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

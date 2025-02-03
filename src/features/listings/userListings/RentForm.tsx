import { Input } from "components/input";
import { SelectField } from "components/select";
import { Formik } from "formik";
import useGetEnquirers from "hooks/useGetEnquirers";
import { rentValidationSchema } from "lib/validations/listingValidation";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { EnquirerItem, RentFormProps, RentFormValues } from "../types";
import { Button } from "components/buttons/Button";
import toast from "react-hot-toast";
import useRentListing from "hooks/useRentListing";
import ErrorMessage from "shared/ErrorMessage";

export default function RentForm({ listingId, parentCallback }: RentFormProps) {
  const [enquirersList, setEnquirersList] = useState<EnquirerItem[]>([]);
  const rentInitialValues: RentFormValues = {
    listingId: listingId,
    rentStartDate: "",
    rentDueDate: "",
    renterEmail: "",
  };

  const { enquirers, enquirersError } = useGetEnquirers(listingId);

  const { mutateRent, rentData, rentError, rentStatus } = useRentListing();

  useEffect(() => {
    if (enquirers?.status === "OK") {
      const uniqueDataWithUndefined =
        Array.from(new Set(enquirers.data.map((item) => item.email))).map(
          (email) => enquirers.data.find((item) => item.email === email)
        ) || [];

      const uniqueData: EnquirerItem[] = uniqueDataWithUndefined.filter(
        (item): item is EnquirerItem => item !== undefined
      );

      setEnquirersList(uniqueData);
    }

    if (enquirersError) {
      toast.error(enquirersError.message, { duration: 5000 });
    }
  }, [enquirers, enquirersError]);

  useEffect(() => {
    if (rentData?.status === "CREATED") {
      toast.success(rentData.message, { duration: 5000 });
      parentCallback();
    }

    if (rentError) {
      toast.error(rentError.message, { duration: 5000 });
    }
  }, [parentCallback, rentData, rentError]);

  return (
    <div>
      <Formik
        initialValues={rentInitialValues}
        validationSchema={rentValidationSchema}
        onSubmit={(values) => mutateRent(values)}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          handleBlur,
          setFieldValue,
          isValid,
          dirty,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              {rentError && <ErrorMessage error={rentError.message} />}
              <div className="mb-4">
                <SelectField<EnquirerItem>
                  name="renterEmail"
                  label="Renter"
                  data={enquirersList}
                  valueKey="email"
                  displayKey="firstName"
                  handleOnChange={(event: BaseSyntheticEvent) => {
                    const value = event.target.value;
                    setFieldValue("renterEmail", value);
                  }}
                  className="w-full bg-[#f7f7f7]"
                  onBlur={handleBlur}
                />
                {touched.renterEmail && errors.renterEmail && (
                  <p className="text-red-500 text-14">{errors.renterEmail}</p>
                )}
              </div>
              <div className="flex justify-between">
                <div className="w-[48%] mb-4">
                  <Input
                    type="datetime-local"
                    name="rentStartDate"
                    placeholder="date when rent will start"
                    className="rounded-md text-base w-full"
                    label="Rent Start Date"
                    onChange={handleChange}
                    value={values.rentStartDate}
                    onBlur={handleBlur}
                    id="rentStartDate"
                  />
                  {touched.rentStartDate && errors.rentStartDate && (
                    <p className="text-red-500 text-14 ">
                      {errors.rentStartDate}
                    </p>
                  )}
                </div>
                <div className="w-[48%] mb-4">
                  <Input
                    type="datetime-local"
                    name="rentDueDate"
                    placeholder="date when rent will expire"
                    className="rounded-md text-base w-full"
                    label="Rent due date"
                    onChange={handleChange}
                    value={values.rentDueDate}
                    onBlur={handleBlur}
                    id="rentDueDate"
                  />
                  {touched.rentDueDate && errors.rentDueDate && (
                    <p className="text-red-500 text-14 ">
                      {errors.rentDueDate}
                    </p>
                  )}
                </div>
              </div>
              <div className="border flex  mt-5">
                <Button
                  onClick={() => parentCallback()}
                  className="border px-10 mr-3 bg-red-300"
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  className="border px-10 bg-green-700 font-hanken-semibold"
                  type="submit"
                  disabled={!(isValid && dirty)}
                  isLoading={rentStatus === "loading"}
                >
                  Submit
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

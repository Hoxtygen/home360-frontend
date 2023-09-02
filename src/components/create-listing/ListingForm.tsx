import { useEffect, useState } from "react";
import { Formik } from "formik";
import { toast } from "react-hot-toast";

import { Button } from "components/buttons/Button";
import AutoTextArea from "components/inputs/AutoTextArea";
import { ButtonAroundInput } from "components/inputs/ButtonAroundInput";
import CheckboxGroup from "components/inputs/CheckboxGroup";
import { CustomSelect } from "components/inputs/CustomSelect";
import InputLabel from "components/inputs/InputLabel";
import RadioGroup from "components/inputs/RadioGroup";
import UploadComponent from "components/inputs/UploadComponent";
import ErrorMessage from "components/shared/ErrorMessage";
import NigerianStates from "constants/nigeria-states";
import {
  apartmentDetails,
  apartmentType,
  applicationDocs,
  facilityQuality,
  petsAllowed,
} from "constants/staticData";
import {
  addValues,
  formatCurrency,
  getRemainingCharacter,
} from "lib/utils/utils";
import {
  initialValues,
  newListingValidationSchema,
} from "lib/validations/listingValidation";
import { Input } from "../inputs/Input";
import useCreateListing from "hooks/useCreateListing";
import LoadingScreen from "../shared/LoadingScreen";
import { displayError } from "components/auth/SignupForm";

export default function ListingForm() {
  const [lgas, setLgas] = useState<string[] | undefined>([]);
  const maxCharacter = 2000;
  const {
    newListingData,
    newListingError,
    isLoadingNewListing,
    mutateNewListing,
  } = useCreateListing();

  useEffect(() => {
    if (newListingData && newListingData.status === "CREATED") {
      toast.success(newListingData.message);
    }
  });
  if (isLoadingNewListing) {
    return (
      <div>
        <LoadingScreen />
        <span className="block text-center font-Open-Sans">
          Submitting your new listing, please wait...
        </span>
      </div>
    );
  }
  return (
    <div className=" border-slate-300 border m-auto md:w-3/4 lg:w-3/4 p-4 max-w-xl">
      <Formik
        initialValues={initialValues}
        validationSchema={newListingValidationSchema}
        onSubmit={(values, actions) => {
          mutateNewListing(values);
          if (newListingData && newListingData.status === "CREATED") {
            actions.resetForm();
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
          isValid,
          dirty,
        }) => (
          <form onSubmit={handleSubmit}>
            {newListingError?.message && (
              <ErrorMessage error={newListingError.message} />
            )}
            {newListingError?.errors && displayError(newListingError.errors)}
            <div className="">
              <h2 className="mb-4 font-semibold">Description</h2>
              <div className="mb-4">
                <Input
                  className="rounded-md dark:text-black text-base w-full"
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
                    Number(values.description.length)
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
                    Number(values.description.length)
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
                    Number(values.description.length)
                  )}{" "}
                  characters remaining
                </p>
                {touched.miscellaneous && errors.miscellaneous && (
                  <ErrorMessage error={errors.miscellaneous} />
                )}
              </div>
            </div>
            <div className="">
              <h2 className="mb-4 font-semibold">Address</h2>
              <div className="flex justify-between mb-4">
                <div className="basis-9/12 mr-2">
                  <Input
                    className="rounded-md dark:text-black text-base w-full md:flex-4 md:mr-3 "
                    label="Street Name"
                    name="address.streetName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="street name"
                    type="text"
                    value={values.address.streetName}
                    id="streetName"
                  />
                  {touched.address?.streetName &&
                    errors.address?.streetName && (
                      <ErrorMessage error={errors.address?.streetName} />
                    )}
                </div>
                <div className="basis-2/12">
                  <Input
                    className="rounded-md dark:text-black text-base w-full"
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
                      className="p-3 border-gray-400 border rounded-md  dark:text-black w-full"
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
                      className="p-3 border-gray-400 border rounded-md  dark:text-black  w-full"
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
                    className="rounded-md dark:text-black text-base w-full"
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
            <div className="">
              <h2 className="mb-4 font-semibold">Tenancy</h2>
              <div className=" flex justify-between flex-wrap mb-4">
                <div className="basis-5/12">
                  <Input
                    type="date"
                    name="availableFrom"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="date when apartment will be available"
                    className="rounded-md dark:text-black text-base w-full"
                    label="Available from"
                    onChange={handleChange}
                    // value={formatDate(values.availableFrom)}
                    value={values.availableFrom}
                    onBlur={handleBlur}
                    id="availableFrom"
                  />
                  {touched.availableFrom && errors.availableFrom && (
                    <ErrorMessage error={String(errors.availableFrom)} />
                  )}
                </div>
                <div className="basis-5/12">
                  <ButtonAroundInput
                    type="number"
                    min={0}
                    name="apartmentInfo.roomNums"
                    placeholder="number of rooms"
                    className="rounded-none dark:text-black text-base text-center w-full"
                    label="Rooms"
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
              </div>
              <div className="lg:flex justify-between">
                <div className="basis-2/4 mb-4 lg:mb-0">
                  <div className="mb-4">
                    <Input
                      className="rounded-md dark:text-black text-base w-full"
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
                      className="rounded-md dark:text-black text-base w-full"
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
                      className="rounded-md dark:text-black text-base w-full"
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
                      className="rounded-md dark:text-black text-base w-full"
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
                    {touched.cost?.agreementFee &&
                      errors.cost?.agreementFee && (
                        <ErrorMessage error={errors.cost?.agreementFee} />
                      )}
                  </div>
                </div>
                <div className="px-4 basis-2/4 mb-4 lg:mb-0">
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
                  <hr />
                  <div className="flex justify-between">
                    <p>Total</p>
                    <p>{formatCurrency(addValues(values.cost))}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="">
                <CheckboxGroup
                  options={apartmentDetails}
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
              <div className="sm:flex flex-wrap justify-between">
                <div className="basis-5/12 mb-4">
                  <CustomSelect
                    className="rounded-r-md dark:text-black w-full"
                    id="apartmentType"
                    label="Apartment Type"
                    name="apartmentInfo.apartmentType"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    options={apartmentType}
                    value={values.apartmentInfo.apartmentType}
                  />
                  {touched.apartmentInfo?.apartmentType &&
                    errors.apartmentInfo?.apartmentType && (
                      <ErrorMessage
                        error={errors.apartmentInfo?.apartmentType}
                      />
                    )}
                </div>
                <div className="basis-5/12 mb-4">
                  <ButtonAroundInput
                    type="number"
                    min={0}
                    name="apartmentInfo.bathroomNums"
                    placeholder="number of bathrooms"
                    className="dark:text-black text-base text-center w-full "
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
                      <ErrorMessage
                        error={errors.apartmentInfo?.bathroomNums}
                      />
                    )}
                </div>
                <div className="mb-4">
                  <ButtonAroundInput
                    type="number"
                    min={0}
                    name="apartmentInfo.bedroomNums"
                    placeholder="number of bedrooms"
                    className="dark:text-black text-base text-center w-full basis-5/12"
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
              </div>
            </div>
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
              <UploadComponent
                name="apartmentImages"
                setFieldValue={setFieldValue}
              />
              {touched.apartmentImages && errors.apartmentImages && (
                <ErrorMessage error={errors.apartmentImages.toString()} />
              )}
            </div>
            <div className="">
              <Button
                disabled={!(isValid && dirty)}
                size="xl"
                type="submit"
                className="dark:text-white disabled:cursor-not-allowed"
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

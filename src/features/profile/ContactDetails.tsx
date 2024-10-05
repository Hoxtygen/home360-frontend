import React from "react";

import Spinner from "components/loaders/Spinner";
import useGetUserDetails from "hooks/useGetUserDetails";
import { Input } from "components/input";
import ErrorMessage from "shared/ErrorMessage";

export default function ContactDetails() {
  const { userDetailsData, userDetailStatus, userDetailError } =
    useGetUserDetails();
  console.log("userDetailsData:", userDetailsData);

  return (
    <>
      {userDetailError && <ErrorMessage error={userDetailError.message} />}
      {userDetailStatus === "loading" && <Spinner />}
      <form className="w-full px-4 py-4">
        <h1 className="text-22 font-hanken-semibold mb-4">Contact Details</h1>
        <div className="lg:flex justify-between items-center">
          <div className=" mb-5 lg:basis-[48%]">
            <Input
              placeholder="Enter first name"
              name="firstName"
              type="text"
              className="w-full rounded-md"
              value={userDetailsData?.data.firstName}
              disabled
            />
          </div>
          <div className=" mb-5 lg:basis-[48%]">
            <Input
              placeholder="Enter last name"
              name="lastName"
              type="text"
              className="w-full rounded-md"
              value={userDetailsData?.data.lastName}
              disabled
            />
          </div>
        </div>
        <div className="lg:flex justify-between items-center">
          <div className=" mb-5 lg:basis-[48%]">
            <Input
              placeholder="Enter email"
              name="email"
              type="email"
              className="w-full rounded-md"
              value={userDetailsData?.data.email}
              disabled
            />
          </div>
          <div className=" mb-5 lg:basis-[48%]">
            <Input
              placeholder="Enter phone number"
              name="phoneNumber"
              type="text"
              className="w-full rounded-md"
              value={userDetailsData?.data.phoneNumber}
              disabled
            />
          </div>
        </div>
      </form>
    </>
  );
}

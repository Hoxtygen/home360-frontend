import React, { useState } from "react";
import Image from "next/image";

import { Button } from "components/buttons/Button";
import { ListingAgentProps } from "./types";

export default function ListingAgent({
  agent,
  handleListingEnquiryFormDialog,
}: ListingAgentProps) {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  function handleShowPhoneNumber() {
    setShowPhoneNumber((prev) => !prev);
  }

  return (
    <div className="h-full flex flex-col justify-between items-center py-4">
      <div className="flex flex-col items-center">
        <Image alt="user" width={100} height={100} src="/icons/tour-icon.svg" />
        <div className="py-4">
          <p className="">
            {agent.firstName} {agent.lastName}
          </p>
          <p>{agent.email}</p>
          <p className="flex">
            <Image
              src="/icons/phone-icon.svg"
              height={30}
              width={30}
              alt="Phone icon"
            />
            <span
              onClick={() => handleShowPhoneNumber()}
              className="underline text-[#2719e6] cursor-pointer w-max"
            >
              {showPhoneNumber ? agent.phoneNumber : "show phone number"}
            </span>
          </p>
        </div>
      </div>
      <div className="">
        <Button
          onClick={() => handleListingEnquiryFormDialog()}
          className="dark:bg-transparent border border-black uppercase font-hanken-medium"
        >
          Contact Agent
        </Button>
      </div>
    </div>
  );
}

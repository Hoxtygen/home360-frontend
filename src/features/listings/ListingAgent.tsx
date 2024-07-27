import React from "react";
import Image from "next/image";

import { Button } from "components/buttons/Button";
import { ListingAgentProps } from "./types";

export default function ListingAgent({
  agent,
  handleListingEnquiryFormDialog,
}: ListingAgentProps) {
  return (
    <div className="h-full flex flex-col justify-between items-center py-4">
      <div className="">
        <Image alt="user" width={100} height={100} src="/icons/tour-icon.svg" />
        <div className="py-4">
          <p className="">
            {agent.firstName} {agent.lastName}
          </p>
          <p>{agent.email}</p>
          <p>{agent.phoneNumber}</p>
        </div>
      </div>
      <div className="">
        <Button
          onClick={() => handleListingEnquiryFormDialog()}
          className="dark:bg-transparent border border-black uppercase font-hanken-medium dark:hover:bg-transparent dark:hover:text-black"
        >
          Contact Agent
        </Button>
      </div>
    </div>
  );
}

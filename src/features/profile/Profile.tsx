import { DashboardLayout } from "components/layouts";
import Image from "next/image";
import React from "react";
import ContactDetails from "./ContactDetails";

export default function Profile() {
  return (
    <DashboardLayout isLoading={false} title="Profile">
      <div className="">
        <div className=" lg:w-[60%] lg:m-auto lg:flex lg:flex-col justify-center items-center">
          <div className="">
            <Image
              src="/icons/header-icon-avatar.svg"
              width={180}
              height={180}
              alt="User"
            />
          </div>
          <ContactDetails />
        </div>
      </div>
    </DashboardLayout>
  );
}

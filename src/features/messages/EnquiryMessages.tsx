import React, { useState } from "react";
// import { EnquiryMessageProps } from "./types";
import EnquiryMessageItem from "./EnquiryMessageItem";
import useGetListingEnquiries from "hooks/useGetListingEnquiries";
import ControlButtons from "shared/ControlButtons";
import LoadingScreen from "shared/LoadingScreen";
import ErrorMessage from "shared/ErrorMessage";
import Link from "next/link";
import useMarkAsRead from "hooks/useMarkAsRead";

export default function Messages() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const {
    listingEnquiriesData,
    listingEnquiriesStatus,
    listingEnquiriesError,
  } = useGetListingEnquiries(page, size);

  const { mutateMarkAsRead } = useMarkAsRead();

  const messages = listingEnquiriesData?.data.items;

  function handleFetchNextData() {
    if (listingEnquiriesData?.data.hasNext) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  function handleFetchPreviousData() {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  }

  function handleMarkAsRead(enquiryMessageId: string, isRead: boolean) {
    if (isRead) return;
    mutateMarkAsRead(enquiryMessageId);
  }
  return (
    <div>
      <ControlButtons
        leftButtonTitle="Previous"
        rightButtonTitle="Next"
        handleLeftButtonAction={() => handleFetchPreviousData()}
        handleRightButtonAction={() => handleFetchNextData()}
        rightButtonClassname="dark:bg-green-500 dark:hover:bg-green-800 dark:text-white"
        rightButtonDisable={!listingEnquiriesData?.data.hasNext}
        leftButtonDisable={page === 1}
        className="justify-end bg-transparent px-5 border-0"
      />
      {listingEnquiriesStatus === "loading" && <LoadingScreen />}
      {listingEnquiriesError && (
        <div className="">
          <ErrorMessage error={listingEnquiriesError.message} />
        </div>
      )}
      <div className="pb-10">
        {messages?.map((message, index) => (
          <Link
            href={`/messages/${message.id}`}
            key={message.id}
            onClick={() => handleMarkAsRead(message.id, message.read)}
          >
            <EnquiryMessageItem
              key={index}
              date={message.createdAt}
              messageString={message.message.substring(0, 150)}
              senderEmail={message.email}
              isRead={message.read}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from "react";
// import { EnquiryMessageProps } from "./types";
import EnquiryMessageItem from "./EnquiryMessageItem";
import useGetListingEnquiries from "hooks/useGetListingEnquiries";
import ControlButtons from "shared/ControlButtons";
import LoadingScreen from "shared/LoadingScreen";
import ErrorMessage from "shared/ErrorMessage";

export default function Messages() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const {
    listingEnquiriesData,
    listingEnquiriesStatus,
    listingEnquiriesError,
  } = useGetListingEnquiries(page, size);

  const messages = listingEnquiriesData?.data.items;

  function handleFetchNextData() {
    if (listingEnquiriesData?.data.hasNext) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  function handleFetchPreviousData() {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
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
        <ErrorMessage error={listingEnquiriesError.message} />
      )}
      <div className="pb-10">
        {messages?.map((message, index) => (
          <EnquiryMessageItem
            key={index}
            date={message.createdAt}
            messageString={message.message.substring(0, 150)}
            senderEmail={message.email}
          />
        ))}
      </div>
    </div>
  );
}

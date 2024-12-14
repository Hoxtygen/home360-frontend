import { useState } from "react";
import Image from "next/image";

import ControlButtons from "shared/ControlButtons";
import ErrorMessage from "shared/ErrorMessage";
import useGetUserListings from "hooks/useGetUserListings";
import UserListingsContainer from "./UserListingsContainer";
import { Button } from "components/buttons/Button";

export default function UserListings() {
  const [page, setPage] = useState(1);
  const {
    userListings,
    userListingsError,
    isUserListingsLoading,
    isPreviousData,
  } = useGetUserListings(page);

  function handleFetchNextData() {
    if (!isPreviousData && userListings?.data.hasNext) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  function handleFetchPreviousData() {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  }

  return (
    <>
      <>
        {userListingsError && (
          <ErrorMessage error={userListingsError.message} />
        )}
      </>
      <div className="flex justify-end py-4">
        <Button
          variant="link"
          href="/listings/new-listing"
          className="border border-blue-600 bg-primary-active text-white"
        >
          <Image
            height={20}
            width={20}
            src="/icons/plus.svg"
            alt=""
            className="mr-2 text-white"
          />
          Create New
        </Button>
      </div>
      <div className="">
        <UserListingsContainer
          listings={userListings?.data.items!}
          isLoading={isUserListingsLoading}
        />
        <ControlButtons
          leftButtonTitle="Previous"
          rightButtonTitle="Next"
          handleLeftButtonAction={() => handleFetchPreviousData()}
          handleRightButtonAction={() => handleFetchNextData()}
          rightButtonClassname="dark:bg-green-500 dark:hover:bg-green-800 dark:text-white"
          rightButtonDisable={isPreviousData || !userListings?.data.hasNext}
          leftButtonDisable={page === 1}
        />
      </div>
    </>
  );
}

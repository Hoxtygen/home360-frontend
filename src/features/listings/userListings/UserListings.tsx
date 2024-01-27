import ControlButtons from "components/shared/ControlButtons";
import ErrorMessage from "components/shared/ErrorMessage";

import useGetUserListings from "hooks/useGetUserListings";
import { useState } from "react";
import UserListingsContainer from "./UserListingsContainer";

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
    <div>
      <div className="">
        {userListingsError && (
          <ErrorMessage error={userListingsError.message} />
        )}
      </div>
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
  );
}

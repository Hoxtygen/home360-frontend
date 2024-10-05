import { UserDetailSuccessResponse } from "@/typedef";
import { useQuery } from "@tanstack/react-query";
import { HOME_360_GET_USER_DETAILS } from "lib/endpoints";
import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";

export default function useGetUserDetails() {
  const { data, error, status } = useQuery({
    queryKey: ["user_details"],
    queryFn: () =>
      requestHandler<UserDetailSuccessResponse>(HOME_360_GET_USER_DETAILS, {
        method: "GET",
      }),
  });
  return {
    userDetailsData: data?.data,
    userDetailError: errorHandler(error),
    userDetailStatus: status,
  };
}

import { useMutation } from "@tanstack/react-query";
import { INTERNAL_LOGOUT_API } from "lib/endpoints";
import requestHandler from "lib/utils/requestHandler";

export function useLogout() {
  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () =>
      requestHandler(INTERNAL_LOGOUT_API, {
        method: "POST",
      }),
  });
  return {
    mutateLogout: mutate,
  };
}

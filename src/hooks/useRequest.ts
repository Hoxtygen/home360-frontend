import { isAxiosError } from "axios";
import fetcher from "lib/utils/fetcher";
import { useState } from "react";
import { LoginResponse } from "./useAuthSWR";

type Options = {
  method?: string;
  data?: any;
};

type Status = "idle" | "pending" | "resolved" | "rejected";

export async function useRequest(url: string, options?: Options) {
  const [data, setData] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  try {
    setStatus("pending");
    const response = await fetcher(url, {
      method: options?.method,
      data: options?.data,
    });
    setData(response.data.data);
    setStatus("resolved");
  } catch (error) {
    if (isAxiosError(error)) {
      setError(error.message);
    }
    // setError(error);
    console.log("unknowntypeErrro: ", error);
  }
  return { data, error, status };
}

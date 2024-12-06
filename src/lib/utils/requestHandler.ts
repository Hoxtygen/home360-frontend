import { AxiosRequestConfig } from "axios";
import axiosClient from "./axiosInstance";

export default async function requestHandler<T>(
  url: string,
  options: AxiosRequestConfig = {}
) {
  const response = await axiosClient<T>(url, { ...options });
  return response;
}

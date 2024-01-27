import axiosClient from "./axiosInstance";

export default async function requestHandler<T>(url: string, options?: {}) {
  const response = await axiosClient<T>(url, { ...options });
  return response;
}

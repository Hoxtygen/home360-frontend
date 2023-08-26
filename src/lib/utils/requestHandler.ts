import axios from "axios";

export default async function requestHandler<T>(url: string, options?: {}) {
  const response = await axios<T>(url, { ...options });
  return response;
}

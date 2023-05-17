import axios from "axios";

const fetcher = async (url: string, options?: {}) => {
  const response = await axios(url, { ...options });
  return response;
};

export default fetcher;

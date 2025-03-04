import { setCookie } from "cookies-next";
import { HOME_360_REFRESH_TOKEN } from "lib/endpoints";
import axiosClient from "lib/utils/axiosInstance";

export async function refreshToken() {
  try {
    const result = await axiosClient.post(
      HOME_360_REFRESH_TOKEN,
      {},
      { withCredentials: true }
    );
    const accessToken = result.data?.data.accessToken;
    setCookie("token", accessToken, { path: "/" });
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
}

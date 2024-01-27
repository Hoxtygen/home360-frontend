import axios from "axios";
import toast from "react-hot-toast";
import { deleteCookie, setCookie } from "cookies-next";
import { MappedSuccessLoginResponse, RefreshTokenTokenResponse } from "typedef";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { parseJSON } from "hooks/useLocalStorage";

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
let context: GetServerSidePropsContext | null = null;
export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};
const isServer = () => {
  return typeof window === "undefined";
};

axiosClient.interceptors.request.use(
  async (config) => {
    const cookies = parseCookies();
    const token = isServer() ? context?.req?.cookies?.token : cookies["token"];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/login" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const user = parseJSON<MappedSuccessLoginResponse>(
            localStorage.getItem("user")
          );
          const result = await axios.post<RefreshTokenTokenResponse>(
            "http://localhost:8080/api/v1/auth/refreshToken",
            {
              token: user?.refreshToken,
            }
          );

          const accessToken = result.data?.data.accessToken;

          setCookie("token", accessToken);

          return axiosClient(originalConfig);
        } catch (error) {
          toast.error("Session time out. Please login again.", {
            id: "sessionTimeOut",
          });

          deleteCookie("token");
          const logout = async () => await axios("/api/auth/logout");
          logout();
          window.localStorage.clear();
          window.location.href = window.location.origin;
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default axiosClient;

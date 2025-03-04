import { getEnvironment } from "lib/utils/utils";

export const clientUrl =
  getEnvironment() === "Development"
    ? process.env.NEXT_PUBLIC_DEV_URL
    : process.env.NEXT_PUBLIC_PROD_URL;

export const serverUrl =
  getEnvironment() === "Development"
    ? process.env.NEXT_PUBLIC_BACKEND_DEV_URL
    : process.env.NEXT_PUBLIC_BACKEND_PROD_URL;

export const webSocketUrl =
  getEnvironment() === "Development"
    ? process.env.NEXT_WEBSOCKET_URL_DEV ?? "http://localhost:8080/ws"
    : process.env.NEXT_WEBSOCKET_URL_PROD ??
      "http://default-production-websocket-url.com";

export const HOME_360_LOGIN_API = `${serverUrl}/auth/login`;
export const HOME_360_SIGNUP_API = `${serverUrl}/auth/register`;
export const HOME_360_PASSWORD_RESET_REQUEST = `${serverUrl}/auth/password-reset-request`;
export const HOME_360_USER_LOGOUT = `${serverUrl}/auth/logout`;
export const HOME_360_REFRESH_TOKEN = `${serverUrl}/auth/refreshToken`;

export const HOME_360__RESET_PASSWORD = `${serverUrl}/auth/reset-password`;
export const HOME_360_VERIFY_EMAIL = `${serverUrl}/auth/verifyEmail`;
export const HOME_360_RESEND_VERIFICATION_TOKEN = `${serverUrl}/auth/resend-verification-token`;

export const HOME_360_LISTING_BASE_API = `${serverUrl}/listings`;
export const HOME_360_SEARCH_LISTINGS_API = `${serverUrl}/listings/search`;
export const HOME_360_FETCH_USERLISTINGS = `${serverUrl}/listings/userListings`;
export const HOME_360_FETCH_LISTING_STATS = `${serverUrl}/listings/listing-statistics`;
export const HOME_360_POST_LISTING_VIEW = `${serverUrl}/listing-views`;

export const HOME_360_LISTING_ENQUIRY_BASE = `${serverUrl}/listing-enquiries`;
export const HOME_360_GET_LISTING_ENQUIRIES = `${serverUrl}/listing-enquiries`;

export const HOME_360_GET_USER_DETAILS = `${serverUrl}/user/user-details`;

export const HOME_360_GET_ENQUIRERS = `${serverUrl}/listing-enquiries/listing`;

export const HOME_360_GIVE_LISTING_OUT_FOR_RENT = `${serverUrl}/rentals`;

//================================INTERNALL ENDPOINTS================
export const INTERNAL_LOGIN_API = "/api/auth/login";
export const INTERNAL_LOGOUT_API = "/api/auth/logout";
export const INTERNAL_DELETE_LISTING = "/api/deleteListing";

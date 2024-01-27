const SERVER_BASE_URL = "http://localhost:8080/api/v1";

export const HOME_360_LOGIN_API = `${SERVER_BASE_URL}/auth/login`;
export const HOME_360_SIGNUP_API = `${SERVER_BASE_URL}/auth/register`;

export const HOME_360_CREATE_LISTING_API = `${SERVER_BASE_URL}/listing`;
export const HOME_360_SEARCH_LISTINGS_API = `${SERVER_BASE_URL}/listings/search`;
export const HOME_360_LISTING_DETAIL_API = `${SERVER_BASE_URL}/listings`;
export const HOME_360_PASSWORD_RESET_REQUEST = `${SERVER_BASE_URL}/auth/password-reset-request`;
export const HOME_360__RESET_PASSWORD = `${SERVER_BASE_URL}/auth/reset-password`;
export const HOME_360_VERIFY_EMAIL = `${SERVER_BASE_URL}/auth/verifyEmail`;
export const HOME_360_RESEND_VERIFICATION_TOKEN = `${SERVER_BASE_URL}/auth/resend-verification-token`;
export const HOME_360_FETCH_USERLISTINGS = `${SERVER_BASE_URL}/userListings`;

//================================INTERNALL ENDPOINTS================
export const INTERNAL_LOGIN_API = "/api/auth/login";
export const INTERNAL_LOGOUT_API = "/api/auth/logout";

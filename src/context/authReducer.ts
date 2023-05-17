import { AuthState, LocalStorageUserInfo } from "typedef";

export type Action =
  | { type: "LOGIN" }
  | { type: "LOGIN_SUCCESS"; payload: LocalStorageUserInfo }
  | { type: "LOGIN_ERROR"; payload: string | null }
  | { type: "LOGOUT" };

const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        error: null,
        loading: true,
        user: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
        user: null,
      };
    case "LOGOUT":
      return {
        ...state,
        error: null,
        user: null,
      };
    default:
      throw new Error("Unknown action type");
  }
};

export default authReducer;

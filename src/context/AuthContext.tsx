import { isAxiosError } from "axios";
import { userInitialData } from "constants/staticData";
import { LOGIN_URL, LOGOUT_URL } from "constants/urls";
import useLocalStorage from "hooks/useLocalStorage";
import requestHandler from "lib/utils/requestHandler";
import { useRouter } from "next/router";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { AuthState, LoginData } from "typedef";
import authReducer, { Action } from "./authReducer";

type Dispatch = React.Dispatch<Action>;
type AuthProviderProps = { children: ReactNode };

interface AuthContextInterface {
  state: AuthState;
  dispatch: Dispatch;
  login(data: LoginData): void;
  logout(): void;
  isAuthenticated(): boolean;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);
const { Provider } = AuthContext;

const initialState = {
  user: null,
  error: null,
  loading: false,
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [user, setUser] = useLocalStorage("user", userInitialData);
  function isAuthenticated() {
    const token = user.token;
    if (!token) {
      return false;
    }
    return true;
  }
  async function login(loginData: LoginData) {
    try {
      dispatch({ type: "LOGIN" });
      const response = await requestHandler<any>(LOGIN_URL, {
        method: "POST",
        data: loginData,
      });
      setUser(response.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      router.push("/dashboard");
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        dispatch({
          type: "LOGIN_ERROR",
          payload: error?.response?.data.message,
        });
      } else {
        dispatch({
          type: "LOGIN_ERROR",
          payload: "Something went wrong.Please try again later",
        });
      }
    }
  }
  async function logout() {
    await requestHandler(LOGOUT_URL);
    localStorage.clear();
    router.replace("/");
    dispatch({ type: "LOGOUT" });
  }
  useEffect(() => {
    if (user) dispatch({ type: "LOGIN_SUCCESS", payload: user });
  }, [user]);

  const value = { state, dispatch, login, logout, isAuthenticated };
  return <Provider value={value}>{children}</Provider>;
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
export { AuthProvider, useAuth };

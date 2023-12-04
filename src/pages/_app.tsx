import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import errorHandler from "lib/utils/errorHandler";
import { useIdleTimer } from "react-idle-timer";
import { useRouter } from "next/router";
import { deleteCookie, hasCookie } from "cookies-next";
import requestHandler from "lib/utils/requestHandler";

const client = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const err = errorHandler(error);
      if (err) toast.error(err?.message);
    },
  }),
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const onIdle = () => {
    if (hasCookie("token")) {
      deleteCookie("token");
      const logout = async () => await requestHandler("/api/auth/logout");
      logout();
      localStorage.clear();
      router.push("/");
    }
  };

  useIdleTimer({
    onIdle,
    timeout: 1000 * 60 * 5,
  });
  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#4BB543",
            },
          },
          error: {
            style: {
              background: "#CC0000",
              color: "white",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

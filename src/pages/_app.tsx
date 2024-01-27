import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { deleteCookie, hasCookie } from "cookies-next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import { useIdleTimer } from "react-idle-timer";

import errorHandler from "lib/utils/errorHandler";
import requestHandler from "lib/utils/requestHandler";
import "../styles/globals.css";
import ErrorBoundary from "components/error-boundary/ErrorBoundary";

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
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#4BB543",
              color: "white",
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

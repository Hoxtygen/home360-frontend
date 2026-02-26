import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { deleteCookie, hasCookie } from "cookies-next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import errorHandler from "lib/utils/errorHandler";
import "../styles/globals.css";
import { ErrorBoundary } from "components/error-boundary";
import { ThemeProvider } from "next-themes";
import { logoutUser } from "hooks/useLogout";
import { useIdleTimer } from "react-idle-timer";
import { IDLE_TIMEOUT_MS } from "constant-data";

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
  const onIdle = async () => {
    if (hasCookie("token")) {
      deleteCookie("token", { path: "/" });
      deleteCookie("refreshToken", { path: "/" });

      // Fallback: manually expire cookies to ensure they are removed
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      document.cookie =
        "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

      try {
        await logoutUser();
      } catch (error) {
        console.error("Auto-logout error:", error);
      }

      localStorage.clear();
      router.push("/");
    }
  };

  useIdleTimer({
    onIdle,
    timeout: IDLE_TIMEOUT_MS,
  });
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider enableSystem={true} attribute="class">
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
      </ThemeProvider>
    </QueryClientProvider>
  );
}

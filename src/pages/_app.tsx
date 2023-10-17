import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import errorHandler from "lib/utils/errorHandler";

const client = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const err = errorHandler(error);
      if (err) toast.error(err?.message);
    },
  }),
});

export default function App({ Component, pageProps }: AppProps) {
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

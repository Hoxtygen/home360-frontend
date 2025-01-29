import { FC, useEffect, useRef } from "react";
import lottie from "lottie-web/build/player/lottie_light";

import Loader from "./loading.json";

interface LoadingGIFProps {
  id?: string;
}

export const LoadingGIF: FC<LoadingGIFProps> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if window is defined (client-side)
      if (containerRef.current) {
        // Check if the ref is attached
        lottie.loadAnimation({
          container: containerRef.current, // Use the ref
          animationData: Loader,
        });
      }
    }
  }, [id]);

  return <div id={id || "loading-screen"} />;
};

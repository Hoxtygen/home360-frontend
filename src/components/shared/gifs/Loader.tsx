import { FC, useEffect } from "react";
import lottie from "lottie-web/build/player/lottie_light";

import Loader from "./loading.json";

interface LoadingGIFProps {
  id?: string;
}

export const LoadingGIF: FC<LoadingGIFProps> = ({ id }) => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector(
        `#${id || "loading-screen"}`
      ) as Element,
      animationData: Loader,
    });
  }, [id]);

  return <div id={id || "loading-screen"} />;
};

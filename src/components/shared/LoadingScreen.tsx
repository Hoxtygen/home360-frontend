import { FC } from "react";
import { LoadingGIF } from "./gifs/Loader";

interface LoaderProps {
  className?: string;
  id?: string;
}

const LoadingScreen: FC<LoaderProps> = ({ id }) => (
  <div className="flex items-center justify-center w-full mt-40">
    <div className="w-32">
      <LoadingGIF id={id} />
    </div>
  </div>
);

export default LoadingScreen;

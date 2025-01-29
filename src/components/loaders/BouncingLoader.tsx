import { FC } from "react";

export const BouncingLoader: FC = () => (
  <div className="flex h-[260px] w-full animate-bounce items-center justify-center">
    <div className="relative mr-3 flex h-6 w-6">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-disabled opacity-75"></span>
      <span className="relative inline-flex h-6 w-6 rounded-full bg-primary-active"></span>
    </div>

    <div className="relative mr-3 flex h-6 w-6">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-disabled opacity-75"></span>
      <span className="relative inline-flex h-6 w-6 rounded-full bg-primary-active"></span>
    </div>

    <div className="relative mr-3 flex h-6 w-6">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-disabled opacity-75"></span>
      <span className="relative inline-flex h-6 w-6 rounded-full bg-primary-active"></span>
    </div>
  </div>
);

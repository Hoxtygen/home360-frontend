import React from "react";
import { DialogHeaderProps } from "./types";

export default function DialogHeader({
  title,
  handleClose,
}: DialogHeaderProps) {
  return (
    <div className="bg-inherit">
      <div>
        <div className="flex justify-between">
          <p className="text-20 leading-20 font-hanken-regular text-grayscale-label">
            {title}
          </p>
          <div className="cursor-pointer" onClick={() => handleClose()}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.01807 13.7346L13.0181 1.73462M1.01807 1.73462L13.0181 13.7346"
                stroke="#C30052"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

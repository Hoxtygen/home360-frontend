// components/CustomFileSelector.tsx
import clsx from "clsx";
clsx;
import React, { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"input">;

const CustomFileSelector = (props: Props) => {
  return (
    <input
      {...props}
      type="file"
      multiple
      className={clsx({
        // Modify the Button shape, spacing, and colors using the `file`: directive
        // button colors
        "file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100": true,
        "file:rounded-lg file:rounded-tr-none file:rounded-br-none": true,
        "file:px-4 file:py-2 file:mr-4 file:border-none": true,
        // overall input styling
        "hover:cursor-pointer border rounded-lg text-gray-400": true,
        " w-full": true,
      })}
    />
  );
};

export default CustomFileSelector;

import React from "react";

import { Button } from "components/buttons/Button";
import { DialogFooterProps } from "./types";

export default function DialogFooter({
  handleCancel,
  handleSubmit,
}: DialogFooterProps) {
  return (
    <div className="flex justify-center uppercase py-2">
      <Button
        className="dark:bg-transparent border border-b-gray-400 rounded-lg mr-4 uppercase"
        onClick={() => handleCancel()}
      >
        Cancel
      </Button>
      <Button
        className="border border-b-gray-400 rounded-lg mr-4 uppercase"
        variant="destructive"
        onClick={() => handleSubmit()}
      >
        Confirm
      </Button>
    </div>
  );
}

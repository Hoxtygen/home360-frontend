import { Button } from "components/buttons/Button";
import React from "react";

type ControlButtonProps = {
  handleLeftButtonAction(): void;
  handleRightButtonAction(): void;
  leftButtonTitle: string;
  rightButtonTitle: string;
  leftButtonClassname?: string;
  rightButtonClassname?: string;
  leftButtonDisable?: boolean;
  rightButtonDisable?: boolean;
};

export default function ControlButtons({
  leftButtonTitle,
  rightButtonTitle,
  handleLeftButtonAction,
  handleRightButtonAction,
  leftButtonClassname,
  rightButtonClassname,
  leftButtonDisable,
  rightButtonDisable,
}: ControlButtonProps) {
  return (
    <div className="border border-black bg-slate-900 flex justify-center gap-5 mt-4 pt-3 pb-3">
      <Button
        onClick={handleLeftButtonAction}
        size="lg"
        variant="subtle"
        className={leftButtonClassname}
        disabled={leftButtonDisable}
      >
        {leftButtonTitle}
      </Button>
      <Button
        onClick={handleRightButtonAction}
        size="lg"
        className={rightButtonClassname}
        disabled={rightButtonDisable}
      >
        {rightButtonTitle}
      </Button>
    </div>
  );
}

import { PropsWithChildren } from "react";

export type DialogProps = PropsWithChildren & {
  title: string;
  show: boolean;
  headerTitle?: string;
  handleClose: () => void;
  contentBlockClass?: string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  hideContentMaxHeight?: boolean;
};
export type DialogHeaderProps = Pick<DialogProps, "handleClose"> & {
  title: string;
};

export type DialogFooterProps = {
  handleCancel: () => void;
  handleSubmit: () => void;
};

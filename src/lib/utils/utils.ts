import clsx, { ClassValue } from "clsx";
import { SUPPORTED_FILE_FORMATS } from "constants/staticData";
import { twMerge } from "tailwind-merge";

export function mergeClass(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function checkSingleFileSize(imgFile: File) {
  let valid = true;
  if (imgFile) {
    const size = imgFile.size / 1024 / 1024;
    if (size > 2) {
      valid = false;
    }
  }
  return valid;
}

export function isFilesCorrectType(files: File[]) {
  let valid = true;
  if (files) {
    files.map((file) => {
      if (!SUPPORTED_FILE_FORMATS.includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
}

export function isValidFileFormat(files: FileList) {
  let valid = true;
  if (files) {
    Array.from(files).map((file) => {
      if (!SUPPORTED_FILE_FORMATS.includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
}

export function isFilesTooBig(files?: File[]): boolean {
  let valid = true;
  if (files) {
    files.map((file) => {
      const size = file.size / 1024 / 1024;
      if (size > 10) {
        valid = false;
      }
    });
  }
  return valid;
}

export function formatString(str: string): string {
  const regex = /\s|-/g;
  return str.replace(regex, "_").toUpperCase();
}

export function formatCurrency(value?: number | string) {
  if (value === undefined) {
    return "0.00";
  }
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(Number(value));
}

export function addValues(values: Object): number {
  return Object.values(values).reduce((acc, currVal) => {
    if (currVal !== undefined) {
      acc = +currVal + acc;
    }
    return acc;
  }, 0);
}

export function getRemainingCharacter(
  maxCharacter: number,
  typedCharacter: number
) {
  return maxCharacter - typedCharacter;
}

export function formatDate(selectedDate: Date) {
  const date = new Date(selectedDate);
  const formatDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const formatMonth =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth();
  const result = [date.getFullYear(), formatMonth, formatDay].join("-");
  return result;
}

export function checkFileSize(file: File) {
  const size = file.size / 1024 / 1024;
  if (size > 2) {
    return {
      code: "name-too-large",
      message: `Size is larger than 2MB`,
    };
  }
  return null;
}

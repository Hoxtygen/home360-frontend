import clsx, { ClassValue } from "clsx";
import { NextApiRequest } from "next";
import { twMerge } from "tailwind-merge";

export function mergeClass(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getToken(req: NextApiRequest) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return token;
}

import { mergeClass } from "lib/utils/utils";
import Image from "next/image";
import React from "react";
import { StatCardProps } from "./types";

export default function StatCard({
  title,
  amount,
  icon,
  classname,
}: StatCardProps) {
  return (
    <div
      className={mergeClass(
        "border border-slate-300 rounded-md p-4 mb-4",
        classname
      )}
    >
      <div className="">
        <h1>{title}</h1>
        <h2 className="font-hanken-black text-24">{amount}</h2>
      </div>
      <div className="grid justify-items-end">
        <Image src={icon} alt="icon" width={50} height={50} className="" />
      </div>
    </div>
  );
}

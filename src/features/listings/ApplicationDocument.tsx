import React from "react";

type ApplicationDocs = {
  applicationDocs: string[];
};
export default function ApplicationDocument({
  applicationDocs,
}: ApplicationDocs) {
  return (
    <div className="flex mt-1">
      {applicationDocs.length > 0 &&
        applicationDocs.map((detail, index) => (
          <p
            className="bg-[#D6D6D6] py-[4px] px-5 text-xs mr-1 rounded mb-[3px]"
            key={`${detail}-${index}`}
          >
            {detail}
          </p>
        ))}
    </div>
  );
}

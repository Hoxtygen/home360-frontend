import React from "react";

export default function Details({
  listingDetails,
}: {
  listingDetails: string[];
}) {
  return (
    <div className="flex flex-wrap">
      {listingDetails &&
        listingDetails.map((detail, index) => (
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

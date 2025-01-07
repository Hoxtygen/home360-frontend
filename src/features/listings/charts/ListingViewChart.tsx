import React, { useEffect, useRef, useState } from "react";

import { ListingsViewDataChart } from "../types";
import { drawListingViewsChart } from "lib/utils/drawListingViewsChart";

export default function ListingViewChart({
  listingsData,
}: ListingsViewDataChart) {
  const listingViewsRef = useRef<SVGSVGElement>(null);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {
    const listingsViewData =
      listingsData.find((d) => d.year === selectedYear)?.months || [];

    const resizeChart = () =>
      drawListingViewsChart({
        svgRef: listingViewsRef,
        data: listingsViewData,
        title: "Listing Views",
      });
    resizeChart();

    window.addEventListener("resize", resizeChart);

    return () => window.removeEventListener("resize", resizeChart);
  }, [selectedYear, listingsData]);

  return (
    <>
      <div className="py-4 text-right">
        <label>Select Year: </label>
        <select
          className="border rounded-md w-[200px] p-3"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {listingsData.map((d) => (
            <option key={d.year} value={d.year}>
              {d.year}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <svg ref={listingViewsRef} style={{ width: "100%", height: "auto" }} />
      </div>
    </>
  );
}

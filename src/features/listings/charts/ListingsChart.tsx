import { useEffect, useRef, useState } from "react";

import { drawChart } from "lib/utils/drawChart";
import { ListingsDataChart } from "../types";

export default function ListingsChart({ listingsData }: ListingsDataChart) {
  const listingsRef = useRef<SVGSVGElement>(null);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {
    const listingsDat =
      listingsData.find((d) => d.year === selectedYear)?.months || [];

    const resizeChart = () =>
      drawChart({
        svgRef: listingsRef,
        data: listingsDat,
        title: "Property Listings",
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
        <svg ref={listingsRef} style={{ width: "100%", height: "auto" }} />
      </div>
    </>
  );
}

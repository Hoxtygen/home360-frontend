import { drawChart } from "lib/utils/drawChart";
import { useEffect, useRef, useState } from "react";
import { ListingsDataChart } from "../types";

export default function ListingIncomeChart({
  listingsData,
}: ListingsDataChart) {
  const listingsIncomeRef = useRef<SVGSVGElement>(null);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  function formatter(value: number) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(value);
  }
  useEffect(() => {
    const listingIncomeData =
      listingsData.find((income) => income.year === selectedYear)?.months || [];
    const resizeChart = () =>
      drawChart({
        svgRef: listingsIncomeRef,
        data: listingIncomeData,
        title: "Earnings",
        formatter,
      });
    resizeChart();
    window.addEventListener("resize", resizeChart);

    return () => window.removeEventListener("resize", resizeChart);
  }, [listingsData, selectedYear]);

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
      <svg ref={listingsIncomeRef} style={{ width: "100%", height: "auto" }} />
    </>
  );
}

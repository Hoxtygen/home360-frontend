import React from "react";
import StatCard from "./StatCard";
import { formatCurrency } from "lib/utils/utils";

type ListingStatsContainerProps = {
  totalListings: number;
  rentedListings: number;
  totalIncome: number;
};

export default function ListingStatsContainer({
  totalListings,
  rentedListings,
  totalIncome,
}: ListingStatsContainerProps) {
  return (
    <div className="sm:flex flex-wrap">
      <StatCard
        title="Total Income"
        amount={formatCurrency(totalIncome)}
        icon="/icons/currency-dollar.svg"
        percentageChange={2.4}
        classname="sm:w-[48%] md:w-[48%] lg:w-3/12 md:mr-2 flex justify-between"
      />
      <StatCard
        title="Total Listings"
        amount={totalListings}
        icon="/icons/house.svg"
        percentageChange={2.4}
        classname="sm:w-[48%] md:w-[48%] lg:w-3/12 md:mr-2 flex justify-between"
      />
      <StatCard
        title="Rented"
        amount={rentedListings}
        icon="/icons/gift-top.svg"
        percentageChange={2.4}
        classname="sm:w-[48%] md:w-[48%] lg:w-3/12 md:mr-2 flex justify-between"
      />
    </div>
  );
}

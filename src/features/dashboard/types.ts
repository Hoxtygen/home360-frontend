export type ListingStatsContainerProps = {
  totalListings: number;
  rentedListings: number;
  totalIncome: number;
  totalViews: number;
};

export type StatCardProps = {
  title: string;
  amount: number | string;
  icon: string;
  percentageChange: number;
  classname?: string;
};

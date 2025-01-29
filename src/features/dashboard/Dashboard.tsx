import { MappedSuccessLoginResponse } from "@/typedef";
import { DashboardLayout } from "components/layouts";
import useGetDashboardStats from "hooks/useGetDashboardStats";
import useLocalStorage from "hooks/useLocalStorage";
import { timeOfDayGreeting } from "lib/utils/utils";
import ErrorMessage from "shared/ErrorMessage";
import ListingStatsContainer from "./ListingStatsContainer";
import { ListingIncomeChart, ListingsChart } from "features/listings/charts";
import ListingViewChart from "features/listings/charts/ListingViewChart";
import { BouncingLoader } from "components/loaders/BouncingLoader";

export default function Dashboard() {
  const [user, _] = useLocalStorage<MappedSuccessLoginResponse | null>(
    "user",
    null
  );
  const timeOfDay = timeOfDayGreeting();

  const { listingStatData, listingStatError, listingStatStatus } =
    useGetDashboardStats();

  return (
    <DashboardLayout title="Dashboard" isLoading={false}>
      <h2 className="text-24">
        {timeOfDay},{" "}
        <span className="font-hanken-semibold">{user?.firstName}</span>
      </h2>

      {listingStatStatus === "loading" && <BouncingLoader />}

      {listingStatError && <ErrorMessage error={listingStatError.message} />}
      {listingStatData && (
        <>
          <ListingStatsContainer
            totalListings={listingStatData?.data?.total_listings}
            rentedListings={listingStatData?.data?.rented_listings}
            totalIncome={listingStatData?.data?.total_income}
            totalViews={listingStatData.data.total_views}
          />
          <div className="lg:flex justify-between mt-10 flex-wrap">
            <div className="lg:w-5/12 p-4  rounded-md">
              <ListingsChart listingsData={listingStatData?.data.listings} />
            </div>
            <div className="lg:w-5/12  rounded-md">
              <ListingIncomeChart listingsData={listingStatData.data.income} />
            </div>
          </div>
          <div className="lg:flex justify-between mt-10 flex-wrap">
            <div className="lg:w-5/12 p-4  rounded-md">
              <ListingViewChart
                listingsData={listingStatData.data.views_by_year_and_month}
              />
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

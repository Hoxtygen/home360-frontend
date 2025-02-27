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
            totalListings={listingStatData?.data?.total_listings ?? 0}
            rentedListings={listingStatData?.data?.rented_listings ?? 0}
            totalIncome={listingStatData?.data?.total_income ?? 0}
            totalViews={listingStatData.data.total_views ?? 0}
          />
          <div className="lg:flex justify-between mt-10 flex-wrap">
            {listingStatData?.data.listings.length > 0 ? (
              <div className="lg:w-5/12 p-4  rounded-md border">
                <ListingsChart listingsData={listingStatData?.data.listings} />
              </div>
            ) : (
              <div className="lg:w-5/12 p-4  rounded-md shadow-md">
                <p>You have no listings</p>
              </div>
            )}

            {listingStatData.data.income.length > 0 ? (
              <div className="lg:w-5/12  rounded-md border">
                <ListingIncomeChart
                  listingsData={listingStatData.data.income}
                />
              </div>
            ) : (
              <div className="lg:w-5/12 p-4  rounded-md shadow-md">
                <p>You have no earnings</p>
              </div>
            )}
          </div>
          <div className="lg:flex justify-between mt-10 flex-wrap">
            {listingStatData.data.views_by_year_and_month.length > 0 ? (
              <div className="lg:w-5/12 p-4  rounded-md shadow-md">
                <ListingViewChart
                  listingsData={listingStatData.data.views_by_year_and_month}
                />
              </div>
            ) : (
              <div className="lg:w-5/12 p-4 shadow-md  rounded-md ">
                <p>You have no views</p>
              </div>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

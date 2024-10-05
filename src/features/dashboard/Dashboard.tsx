import { MappedSuccessLoginResponse } from "@/typedef";
import { DashboardLayout } from "components/layouts";
import useLocalStorage from "hooks/useLocalStorage";
import { timeOfDayGreeting } from "lib/utils/utils";
import React from "react";

export default function Dashboard() {
  const [user, _] = useLocalStorage<MappedSuccessLoginResponse | null>(
    "user",
    null
  );
  const timeOfDay = timeOfDayGreeting();
  return (
    <DashboardLayout title="Dashboard" isLoading={false}>
      <h2 className="text-24">
        {timeOfDay},{" "}
        <span className="font-hanken-semibold">{user?.firstName}</span>
      </h2>
    </DashboardLayout>
  );
}

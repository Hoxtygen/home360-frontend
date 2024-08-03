import { DashboardLayout } from "components/layouts";
import ListingForm from "./ListingForm";

export default function CreateListing() {
  return (
    <DashboardLayout title="New Listing" isLoading={false}>
      <ListingForm />
    </DashboardLayout>
  );
}

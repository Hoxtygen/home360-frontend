import DashboardLayout from "components/layouts/dashboard/DashboardLayout";
import { EnquiryMessages } from "features/messages";

export default function Messages() {
  return (
    <DashboardLayout title="Messages" isLoading={false}>
      <EnquiryMessages />
    </DashboardLayout>
  );
}

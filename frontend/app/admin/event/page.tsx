import type { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/layout";
import EventClient from "./client";

export const metadata: Metadata = {
  title: "Event",
  description: "Event Admin",
};

export default function AdminPage() {
  return (
    <DashboardLayout type="admin">
      <EventClient />
    </DashboardLayout>
  );
}

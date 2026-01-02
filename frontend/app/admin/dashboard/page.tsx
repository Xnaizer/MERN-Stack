import type { Metadata } from "next";
import AdminClient from "./client";
import DashboardLayout from "@/components/dashboard/layout";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Admin",
};

export default function AdminPage() {
  return (
    <DashboardLayout type="admin">
      <AdminClient />
    </DashboardLayout>
  );
}

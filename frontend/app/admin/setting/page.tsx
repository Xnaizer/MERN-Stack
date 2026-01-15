import type { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/layout";
import SettingsClient from "./client";

export const metadata: Metadata = {
  title: "Settings",
  description: "Settings Admin",
};

export default function AdminPage() {
  return (
    <DashboardLayout type="admin">
      <SettingsClient />
    </DashboardLayout>
  );
}

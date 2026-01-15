import type { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/layout";
import SettingClient from "./client";

export const metadata: Metadata = {
  title: "Setting",
  description: "Setting Admin",
};

export default function AdminPage() {
  return (
    <DashboardLayout type="admin">
      <SettingClient />
    </DashboardLayout>
  );
}

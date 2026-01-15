import type { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/layout";
import BannerClient from "./client";

export const metadata: Metadata = {
  title: "Banner",
  description: "Banner Admin",
};

export default function AdminPage() {
  return (
    <DashboardLayout type="admin">
      <BannerClient />
    </DashboardLayout>
  );
}

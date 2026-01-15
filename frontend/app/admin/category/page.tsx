import type { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/layout";
import CategoryClient from "./client";

export const metadata: Metadata = {
  title: "Category",
  description: "Category Admin",
};

export default function AdminPage() {
  return (
    <DashboardLayout type="admin">
      <CategoryClient />
    </DashboardLayout>
  );
}

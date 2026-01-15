import type { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/layout";
import TransactionClient from "./client";

export const metadata: Metadata = {
  title: "Transaction",
  description: "Transaction Admin",
};

export default function AdminPage() {
  return (
    <DashboardLayout type="admin">
      <TransactionClient />
    </DashboardLayout>
  );
}

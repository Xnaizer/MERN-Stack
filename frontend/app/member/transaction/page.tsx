import type { Metadata } from "next";
import TransactionClient from "./client";
import DashboardLayout from "@/components/dashboard/layout";

export const metadata: Metadata = {
  title: "Transaction",
  description: "Dashboard Transaction Member",
};

export default function MemberPage() {
  return (
    <DashboardLayout type="member">
        <TransactionClient />
    </DashboardLayout>
  );
}
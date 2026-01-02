import type { Metadata } from "next";
import MemberClient from "./client";
import DashboardLayout from "@/components/dashboard/layout";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Member",
};

export default function MemberPage() {
  return (
    <DashboardLayout type="member">
      <MemberClient />
    </DashboardLayout>
  );
}

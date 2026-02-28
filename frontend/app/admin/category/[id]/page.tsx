import type { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/layout";
import CategoryDetailClient from "./client";

export const metadata: Metadata = {
  title: "Category Detail",
  description: "Category Detail",
};

export default async function AdminPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <DashboardLayout type="admin">
      <CategoryDetailClient paramsId={id} />
    </DashboardLayout>
  );
}
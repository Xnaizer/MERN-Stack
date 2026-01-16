import type { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/layout";
import CategoryClient from "./client";

export const metadata: Metadata = {
  title: "Category",
  description: "List of all Categories, create new category, and manage existing categories",
};

export default function AdminPage() {
  return (
    <DashboardLayout type="admin">
      <h1 className="text-slate-800 font-bold text-4xl mt-8">{metadata.title as string}</h1>
      <h2 className="text-slate-700 text-xl pt-3 mb-8">{metadata.description as string}</h2>
      <CategoryClient />
    </DashboardLayout>
  );
}

import type { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/layout";
import CategoryClient from "./client";
import { CgLayoutList } from "react-icons/cg";

export const metadata: Metadata = {
  title: "Category",
  description: "List of all Categories, create new category, and manage existing categories",
};

export default function AdminPage() {
  return (
    <DashboardLayout type="admin">
      <section className="flex   md:items-center  md:gap-4">
        <CgLayoutList className="hidden md:block text-7xl md:text-[4.5rem] text-danger-500" />
        <div>
          <h1 className="text-slate-800 font-bold text-2xl md:text-4xl mt-4 md:mt-8">{metadata.title as string}</h1>
          <h2 className="text-slate-700 text-xs md:text-xl pt-3 mb-8">{metadata.description as string}</h2>
        </div>
      </section>
      <CategoryClient />
    </DashboardLayout>
  );
}

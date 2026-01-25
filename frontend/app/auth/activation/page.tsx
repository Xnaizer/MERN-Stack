import type { Metadata } from "next";
import ActivationClient from "./client";
import authServices from "@/services/auth.service";

export const metadata: Metadata = {
  title: "Activation",
  description: "Activated your account",
};

type PageProps = {
  searchParams: Promise<{ code?: string }>;
};

export default async function ActivationPage({ searchParams }: PageProps) {

  const { code } = await searchParams;

  if(!code) {
    return <ActivationClient status="failed" />
  }

  try {
    const result = await authServices.activation({ code });
    const ok = Boolean(result?.data.data);

    return <ActivationClient status={ok ? 'success' : 'failed'} />
  } catch {
    return <ActivationClient status="failed" />
  }

// return <ActivationClient status="success" />
}


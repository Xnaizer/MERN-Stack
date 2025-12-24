import type { Metadata } from "next";
import Client from "./client";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Our Team page",
};

export default function OurTeamPage() {
  return <Client />;
}

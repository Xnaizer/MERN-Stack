import type { Metadata } from "next";
import ClientHome from "./ClientHome";

export const generateMetadata = (): Metadata => ({
  title: "Home | MernApp",
  description: "Landing page of MernApp",
});

export default function HomePage() {
  return <ClientHome />;
}
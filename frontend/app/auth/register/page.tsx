import type { Metadata } from "next";
import Register from "./client";

export const metadata: Metadata = {
  title: "Register",
  description: "Register your account",
};

export default function RegisterPage() {
  return <Register />;
}

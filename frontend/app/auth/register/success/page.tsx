import type { Metadata } from "next";
import RegisterSuccess from "./client";


export const metadata: Metadata = {
  title: "Register Success",
  description: "Success register your account",
};

export default function RegisterSuccessPage() {
  return <RegisterSuccess />;
}


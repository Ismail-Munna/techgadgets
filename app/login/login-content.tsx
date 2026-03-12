"use client";

import { useSearchParams } from "next/navigation";
import LoginForm from "./login-form";

function getSafeCallbackUrl(value: string | null) {
  if (value && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  return "/manage-products";
}

export default function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"));

  return <LoginForm callbackUrl={callbackUrl} />;
}

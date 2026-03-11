'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function GoogleAuthSection({
  callbackUrl = "/manage-products",
}: {
  callbackUrl?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      await signIn("google", { callbackUrl });
    } catch {
      toast.error("Failed to continue with Google");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M21.81 10.04H12.18v3.92h5.55c-.24 1.26-.95 2.32-2.01 3.04v2.53h3.25c1.91-1.76 3.02-4.35 3.02-7.42 0-.71-.06-1.39-.18-2.07Z"
              fill="#4285F4"
            />
            <path
              d="M12.18 22c2.73 0 5.02-.9 6.69-2.47l-3.25-2.53c-.9.6-2.06.96-3.44.96-2.64 0-4.88-1.78-5.68-4.17H3.14v2.61A10.08 10.08 0 0 0 12.18 22Z"
              fill="#34A853"
            />
            <path
              d="M6.5 13.79a6.07 6.07 0 0 1 0-3.88V7.3H3.14a10.06 10.06 0 0 0 0 9.1l3.36-2.61Z"
              fill="#FBBC05"
            />
            <path
              d="M12.18 6.05c1.49 0 2.82.51 3.87 1.51l2.9-2.9C17.2 3.03 14.91 2 12.18 2a10.08 10.08 0 0 0-9.04 5.3l3.36 2.61c.8-2.39 3.04-4.17 5.68-4.17Z"
              fill="#EA4335"
            />
          </svg>
        )}
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
          <span className="bg-white px-3">Or</span>
        </div>
      </div>
    </div>
  );
}

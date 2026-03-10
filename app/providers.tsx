'use client';

import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

function AppToaster() {
  const { theme } = useTheme();

  return <Toaster position="top-right" richColors theme={theme} />;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        {children}
        <AppToaster />
      </ThemeProvider>
    </SessionProvider>
  );
}

"use client";

import { AuthProvider } from "@/src/lib/auth/context";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

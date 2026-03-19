"use client";

import { ThemeProvider } from "@/app/context/ThemeContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
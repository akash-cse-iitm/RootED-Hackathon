import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "RootED",
  description:
    "A mobile-first support platform helping first-generation learners stay in school."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans text-text antialiased">{children}</body>
    </html>
  );
}

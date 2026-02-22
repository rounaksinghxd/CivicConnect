import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Civic Connect",
  description: "Civic engagement platform",
};

import { Toaster } from "@/components/ui/sonner";
import DevAdminShortcut from "@/components/dev-admin-shortcut";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-right" richColors />
        <DevAdminShortcut />
      </body>
    </html>
  );
}

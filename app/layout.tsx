import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Franco Onlie Store",
  description: "Franco Onlie Store",
  generator: "Fay",
  icons: {
    icon: [
      {
        url: "/franco_logo.jpeg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/franco_logo.jpeg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/franco_logo.jpeg",
        type: "image/svg+xml",
      },
    ],
    apple: "/franco_logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}

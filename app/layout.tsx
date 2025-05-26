"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Richard Knowles – Dynamic IT Leadership & Resume",
  description:
    "Explore the professional journey and skills of Richard Knowles, IT leader and MDM/Product specialist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize scroll-triggered animations
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}

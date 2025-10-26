import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Test Tiger - Professional Website Testing & Audit Services",
  description: "Comprehensive website audits covering performance, accessibility, SEO, and UX. Get actionable insights to improve your site's conversion, speed, and user experience.",
  keywords: ["website audit", "web performance", "accessibility testing", "SEO audit", "UX review", "website testing"],
  authors: [{ name: "Test Tiger" }],
  openGraph: {
    title: "Test Tiger - Professional Website Testing & Audit Services",
    description: "Comprehensive website audits covering performance, accessibility, SEO, and UX.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

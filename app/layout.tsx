import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Plant Identifier",
  description:
    "Uses advanced AI technology to help you identify and learn about various plant species quickly and accurately.",
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
        <GoogleAnalytics GA_MEASUREMENT_ID="G-HY79L2PGEL" />
      </body>
    </html>
  );
}

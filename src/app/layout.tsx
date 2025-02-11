import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppProviders from "@/providers/app.providers";
import { Space_Grotesk } from 'next/font/google';

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

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Panteon Case Study",
  description: "Panteon Case Study",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.className}`}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

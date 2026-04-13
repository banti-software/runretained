import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Run Retained — AI-Powered Executive Search Platform",
  description:
    "The operating system for retained executive search. AI-powered intake, mandate drafting, candidate evaluation, and artifact generation — all inside a governed workflow.",
  openGraph: {
    title: "Run Retained — AI-Powered Executive Search Platform",
    description:
      "AI-powered execution for retained executive search. Structure every search from intake to close.",
    url: "https://runretained.com",
    siteName: "Run Retained",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Run Retained — AI-Powered Executive Search Platform",
    description:
      "AI-powered execution for retained executive search. Structure every search from intake to close.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Inter, Calistoga } from "next/font/google"
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ['latin'], variable: "--font-sans"})
const calistoga = Calistoga({ subsets: ['latin'], variable: "--font-serif", weight: ["400"]});

export const metadata: Metadata = {
  title: "Mubashar Warriach · Full-Stack & iOS Engineer",
  description:
    "Portfolio of Mubashar Warriach: the Uncommon Grounds ordering app, a crypto exchange built from scratch, YarTV, iPhone Hub and Pulse, self-hosted on jailbroken iPhones.",
  metadataBase: new URL("https://mubashar.cc"),
  openGraph: {
    title: "Mubashar Warriach",
    description: "I build apps end to end, and host them on my own iPhones.",
    url: "https://mubashar.cc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(inter.variable, calistoga.variable, "bg-gray-900 text-white antialiased font-sans")}>{children}</body>
    </html>
  );
}

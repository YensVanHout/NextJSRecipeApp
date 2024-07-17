import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe Web Application",
  description: "Recipebook by Yens Van Hout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="wrapper w-full min-h-screen bg-stone-100 dark:bg-stone-800">
          <Navigation />
          <div className="w-3/4 mx-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}

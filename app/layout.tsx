import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "./components/Navbar";
import { Sour_Gummy } from "next/font/google";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const sour_gummy = Sour_Gummy({
  weight: ["100", "200", "400", "900"],
  subsets: ["latin"],
  variable: "--font-sour-gummy",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sour_gummy.variable}>
      <body className="bg-background">
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

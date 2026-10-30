import type { Metadata } from "next";
import Footer from "../src/components/layout/Footer";
import Navbar from "../src/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "MERXENTA | Built on Belief, Driven by Possibility",
  description:
    "Merxenta brings together businesses across industries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
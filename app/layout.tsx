import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import kokopelli from "@/kokopelli.config";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: kokopelli.site_title,
  description: kokopelli.site_description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="bg-secondary-100 dark:bg-secondary-800 antialiased text-secondary-900 dark:text-secondary-100 font-light"
    >
      <body className={manrope.className}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}

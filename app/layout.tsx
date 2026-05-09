import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import "./globals.css";

/* Google Fonts */
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ProStore - Luxury E-Commerce",
  description: "Discover expertly curated products crafted for the discerning.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "ProStore",
    description: "Luxury e-commerce platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfairDisplay.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

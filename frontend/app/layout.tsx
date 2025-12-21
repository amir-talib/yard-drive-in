import type { Metadata } from "next";
import { Abril_Fatface, Kaushan_Script, Merriweather, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { RetroOverlay } from "@/components/shared/RetroOverlay";

const abrilFatface = Abril_Fatface({
  variable: "--font-abril",
  weight: "400",
  subsets: ["latin"],
});

const kaushanScript = Kaushan_Script({
  variable: "--font-kaushan",
  weight: "400",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yard Drive-In | One Night Only",
  description: "Secure your spot for Abuja's premium retro drive-in cinema event. Dec 28.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${abrilFatface.variable} ${kaushanScript.variable} ${merriweather.variable} ${pressStart2P.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <RetroOverlay />
        {children}
      </body>
    </html>
  );
}

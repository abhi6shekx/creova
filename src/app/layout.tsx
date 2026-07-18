import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creova — Experience Builder",
  description: "Build and manage distinctive brand experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

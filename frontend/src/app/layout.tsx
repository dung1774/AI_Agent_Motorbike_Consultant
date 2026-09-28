import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xe X — Tư vấn chọn xe",
  description: "Demo tư vấn xe máy điện theo nhu cầu, ngân sách và quãng đường.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="vi"><body>{children}</body></html>;
}

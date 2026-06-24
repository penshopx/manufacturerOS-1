import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

export const metadata: Metadata = {
  title: "ManufactureOS - Agentic AI untuk Industri Manufaktur Indonesia",
  description: "Platform AI untuk operasional IKM Otomotif Tier 2 Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-slate-900 text-slate-50 min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 ml-[280px]">
            <Header />
            <main className="p-6 mt-16">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

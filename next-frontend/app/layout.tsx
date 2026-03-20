import "./globals.css";
import { Inter } from "next/font/google";
import AppSidebar from "@/components/AppSidebar";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RegAI | Legal Compliance Executive",
  description: "Executive Regulatory Compliance Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={`${inter.className} h-full antialiased transition-colors duration-300`}>
        <Providers>
          <div className="flex min-h-screen overflow-hidden">
            <AppSidebar />
            {/* Main Content Area */}
            <main className="flex-1 ml-[260px] flex flex-col min-h-screen relative overflow-hidden bg-background-dark">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

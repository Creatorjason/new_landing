"use client"

// import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from 'react-hot-toast'
import ThemeToggleButton from "@/components/themeToggle/ThemeToggleButton";
import { SessionProvider } from "next-auth/react";
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// const space = Space_Grotesk({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={`bg-white transition-all ease-in-out duration-200 scroll-smooth`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            {children}
          </SessionProvider>

          <Toaster />
            {/* <ThemeToggleButton /> */}
          </ThemeProvider>
        </body>
      </html>
    </QueryClientProvider>
  );
}

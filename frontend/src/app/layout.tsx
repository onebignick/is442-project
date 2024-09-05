import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "IS442 Project",
  description: "A custom CRM built for a school project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { UserNav } from "@/components/user-nav";
import { Navbar } from "@/components/navbar";
import { ModeToggle } from "@/components/toggle-theme-button";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";

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
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-row justify-between p-4 items-center">
            <Navbar className="mx-6" />
            <div className="flex flex-row gap-4 items-center">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

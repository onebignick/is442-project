import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components/navbar/navbar";
import { ModeToggle } from "@/components/toggle-theme-button";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

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
            {children}
        </body>
      </html>
  );
}
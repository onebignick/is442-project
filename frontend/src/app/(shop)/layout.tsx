import type { Metadata } from "next";
import "../globals.css";
import { ModeToggle } from "@/components/toggle-theme-button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar/shop-navbar";

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
    <div>
      <div className="flex flex-row justify-between p-4 items-center">
          <Navbar/>
        <div className="flex flex-row gap-4 items-center">
          <ModeToggle />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      {children}
    </div>
  );
}
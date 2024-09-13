
import type { Metadata } from "next";
import { SalesSidebar } from "@/components/navbar/sales-sidebar";
import { SalesNavbar } from "@/components/navbar/sales-navbar";

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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <SalesSidebar/>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <SalesNavbar/>
            {children}
        </div>
    </div>
  );
}
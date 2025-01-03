import { AdminMainNav } from "@/components/admin/AdminMainNav";
import { Search } from "@/components/sales/search";
import { UserButton } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <AdminMainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                <Search />
                <UserButton/>
                </div>
            </div>
        </div>
        {children}
    </>
  );
}

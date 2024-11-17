import Link from "next/link"

import { cn } from "@/lib/utils"

export function AdminMainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/apps/admin"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/apps/admin/users"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Users
      </Link>
      <Link
        href="/apps/admin/templates"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Manage Templates
      </Link>
    </nav>
  )
}
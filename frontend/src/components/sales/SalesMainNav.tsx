
import Link from "next/link"

import { cn } from "@/lib/utils"

export function SalesMainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/apps/sales"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="#"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Sales
      </Link>
      <Link
        href="/apps/sales/customers"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </Link>
    </nav>
  )
}
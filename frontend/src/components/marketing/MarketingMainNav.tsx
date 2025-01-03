
import Link from "next/link"

import { cn } from "@/lib/utils"

export function MarketingMainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/apps/marketing"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/apps/marketing/orders"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Sales
      </Link>
      <Link
        href="/apps/marketing/customers"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </Link>
      <Link
        href="/apps/marketing/templates"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Templates
      </Link>
    </nav>
  )
}